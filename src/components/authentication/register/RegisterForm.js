import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';

import { useRegistrationMutation } from '../../../redux/medbookAPI';
import Auth from '../../../auth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [dateFieldIsClicked, setDateFieldIsClicked] = useState(false);

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
      .required('Дата рождения: Обязательное поле')
  });

  const [register] = useRegistrationMutation();

  const handleRegister = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      await register(formik.values).unwrap();
      Auth.login(() => null, 'patient');
      navigate('/dashboard', { replace: true });
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
      birthDate: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: handleRegister
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
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
  );
}
