import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useGetUserByEmailMutation, useRegistrationMutation } from '../../../redux/medbookAPI';
import { login as loginAction } from '../../../redux/authSlice';
import { ROLES, ORGAN_NAMES, SPECIALIZATIONS, ORGANS_DEFAULT } from '../../../constants';

import { getHashCode } from '../../../utils/hash';

import RegisterErrorDialog from './RegisterErrorDialog';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [showSpecialization, setShowSpecialization] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Слишком коротко!')
      .max(50, 'Очень длинно!')
      .required('Имя: Обязательное поле'),
    lastName: Yup.string()
      .min(2, 'Слишком коротко!')
      .max(50, 'Слишком длинно!')
      .required('Фамилия: Обязательное поле'),
    email: Yup.string().email('Проверьте корректность почты').required('Почта: Обязательное поле'),
    password: Yup.string().required('Пароль: Обязательное поле'),
    birthDate: Yup.date()
      .min(new Date('01.01.1900'), 'Введите корректную дату!')
      .max(new Date(), 'Введите корректную дату')
      .required('Дата рождения: Обязательное поле'),
    isDoctor: Yup.boolean(),
    bodyPart: Yup.string().when('isDoctor', {
      is: true,
      then: Yup.string().required('Для врача необходимо ввести специализацию')
    })
  });

  const [register] = useRegistrationMutation();

  const dispatch = useDispatch();

  const [getUserByEmail] = useGetUserByEmailMutation();

  const [showModal, setShowModal] = useState(false);

  const handleRegister = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      const [candidate] = await getUserByEmail(formik.values.email).unwrap();

      if (candidate) return setShowModal(true);

      const hashPassword = getHashCode(formik.values.password);

      const userInfoToSend = {
        ...formik.values,
        password: hashPassword
      };

      const userInfoFromServer = await register(userInfoToSend).unwrap();

      const userInfo = {
        ...userInfoFromServer,
        role: formik.values.isDoctor ? ROLES.DOCTOR : ROLES.PATIENT
      };

      dispatch(loginAction({ info: userInfo }));
      navigate('/dashboard/app', { replace: true });
    } catch (e) {
      console.error('Не удалось создать пользователя ', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: format(new Date(), 'yyyy-MM-dd'),
      isDoctor: false,
      bodyPart: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: handleRegister
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      {showModal && (
        <RegisterErrorDialog
          onClose={() => setShowModal(false)}
          onShow={() => setShowModal(true)}
        />
      )}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Имя"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Фамилия"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Электронная почта"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              fullWidth
              autoComplete="birth-date"
              type="date"
              label="Дата рождения"
              {...getFieldProps('birthDate')}
              error={Boolean(touched.birthDate && errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                onClick={() => setShowSpecialization(!showSpecialization)}
                control={<Checkbox {...getFieldProps('isDoctor')} />}
                label="Я врач"
              />
            </Stack>

            {showSpecialization && (
              <FormControl>
                <InputLabel id="test-select-label">Специализация</InputLabel>
                <Select
                  {...getFieldProps('bodyPart')}
                  label="Специализация"
                  error={Boolean(touched.bodyPart && errors.bodyPart)}
                  helperText={touched.bodyPart && errors.bodyPart}
                >
                  {Object.keys(ORGANS_DEFAULT).map((organName) => (
                    <MenuItem key={organName} value={organName}>
                      {SPECIALIZATIONS[organName]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Регистрация
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
