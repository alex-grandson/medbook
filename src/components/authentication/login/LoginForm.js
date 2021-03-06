import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLoginMutation } from '../../../redux/medbookAPI';
import { login as loginAction } from '../../../redux/authSlice';
import { getHashCode } from '../../../utils/hash';

import LoginErrorDialog from './LoginErrorDialog';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email: обязательное поле').required('Email: обязательное поле'),
    password: Yup.string().required('Пароль: обязательное поле')
  });

  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      const hashPassword = getHashCode(formik.values.password);

      const [userInfo] = await login({
        email: formik.values.email,
        password: hashPassword
      }).unwrap();

      if (!userInfo) return setShowModal(true);

      dispatch(loginAction({ info: userInfo }));

      navigate('/dashboard/app', { replace: true });
    } catch (e) {
      console.error('Не удалось войти в систему ', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
      isDoctor: false
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      {showModal && (
        <LoginErrorDialog onShow={() => setShowModal(true)} onClose={() => setShowModal(false)} />
      )}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
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
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Запомнить меня"
            />

            <Link component={RouterLink} variant="subtitle2" to="#">
              Забыли пароль?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Вход
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
