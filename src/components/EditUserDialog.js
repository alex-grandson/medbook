import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack
} from '@mui/material';
import * as Yup from 'yup';

import { setProperties as setPropertiesAction } from '../redux/authSlice';
import { useEditUserMutation } from '../redux/medbookAPI';

const EditUserDialog = ({ onClose, onShow }) => {
  const EditUserSchema = Yup.object().shape({
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

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [editUser] = useEditUserMutation();

  const dispatch = useDispatch();

  const oldUserInfo = useSelector((state) => state.auth.userInfo);

  const handleEditUser = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      const updatedUserInfo = { ...oldUserInfo, ...formik.values };
      const { data: userInfo } = await editUser(updatedUserInfo);
      dispatch(setPropertiesAction({ newUserInfo: userInfo }));
      onClose();
    } catch (e) {
      console.error('Не удалось изменить информацию о пользователе ', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      birthDate: userInfo.birthDate
    },
    validationSchema: EditUserSchema,
    onSubmit: handleEditUser
  });

  const { getFieldProps, handleSubmit, touched, errors } = formik;

  return (
    <Dialog
      open={onShow}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <FormikProvider value={formik}>
        <DialogTitle id="alert-dialog-title">Изменение информации о пользователе</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Измените поля ниже в соответствии с изменившейся информацией
          </DialogContentText>

          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginTop: '16px' }}>
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
              sx={{ marginTop: '16px' }}
            />
            <TextField
              disabled
              fullWidth
              autoComplete="birth-date"
              type="date"
              label="Дата рождения"
              {...getFieldProps('birthDate')}
              error={Boolean(touched.birthDate && errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
              sx={{ marginTop: '16px' }}
            />
            <DialogActions sx={{ marginTop: '16px' }}>
              <Button type="submit" onSubmit={handleSubmit} autoFocus>
                Обновить информацию
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </FormikProvider>
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default EditUserDialog;
