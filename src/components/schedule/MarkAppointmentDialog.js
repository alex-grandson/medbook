import React from 'react';
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
import { useMarkAppointmentMutation } from '../../redux/medbookAPI';
import { OBJECTIVELY, COMPLAINTS, DIAGNOSIS, RECEIPT } from '../../constants';
import 'moment/locale/ru';

export default function MarkAppointmentDialog({ onClose, onShow, id }) {
  const [markAppointment] = useMarkAppointmentMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const handleMarkAppointment = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      console.log('formik.values ', formik.values);
      const { data: userInfo } = await markAppointment({ ...formik.values, id });
      // dispatch(setPropertiesAction({ newUserInfo: userInfo }));
      onClose();
    } catch (e) {
      console.error('Не удалось записать данные о приеме ', e);
    }
  };
  const formik = useFormik({
    initialValues: {
      doctorId: undefined,
      patientId: userInfo.id,
      date: moment().format('YYYY-MM-DD'),
      complaints: 'Кашель Рвота',
      objectively: 'Неудовлетворительно',
      temp: '36.6',
      pulse: '68',
      blood_pressure: '110/70',
      diagnosis: 'Диагноз',
      application:
        'Кожные покровы и видимые слизистые без изменений, ' +
        'носовое дыхание свободное. Язык влажный, чистый. ' +
        'В легких везикулярное дыхание, хрипоты нет. ' +
        'Тоны сердца ритмичные, живой без болезненный',
      receipt: 'Полоскание, мытье.'
    },
    onSubmit: handleMarkAppointment
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
        <DialogTitle id="alert-dialog-title">Отметить прием</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Измените поля ниже в соответствии с изменившейся информацией
          </DialogContentText>

          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              {...getFieldProps('day')}
              defaultValue={moment().format('DD.MM')}
              fullWidth
              label="Прием"
              style={textFieldStyle}
              disabled
            />
            <Autocomplete
              multiple
              style={textFieldStyle}
              options={COMPLAINTS}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...getFieldProps('complaints')}
                  label="Жалобы"
                  placeholder="Жалобы"
                />
              )}
            />
            {/* objectively */}
            <Autocomplete
              id="tags-outlined"
              style={textFieldStyle}
              options={OBJECTIVELY}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Состояние" placeholder="Удовлитворительно" />
              )}
            />
            <TextField
              {...getFieldProps('temp')}
              fullWidth
              label="Температура"
              style={textFieldStyle}
            />
            <TextField
              fullWidth
              label="А. Д."
              {...getFieldProps('blood_pressure')}
              style={textFieldStyle}
              placeholder="мм рт.ст."
            />

            <TextField fullWidth label="Пульс" {...getFieldProps('pulse')} style={textFieldStyle} />
            <Autocomplete
              id="tags-outlined"
              style={textFieldStyle}
              options={DIAGNOSIS}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...getFieldProps('diagnosis')}
                  label="Диагноз"
                  placeholder=""
                />
              )}
            />
            <TextField
              fullWidth
              multiline
              label="Примечание"
              {...getFieldProps('application')}
              style={textFieldStyle}
            />
            <Autocomplete
              multiple
              id="tags-outlined"
              style={textFieldStyle}
              options={RECEIPT}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...getFieldProps('receipt')}
                  label="Рекомендации"
                  placeholder="Рекомендации"
                />
              )}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginTop: '16px' }} />
            <DialogActions sx={{ marginTop: '16px' }}>
              <Button type="submit" onSubmit={handleSubmit} autoFocus>
                Завершить прием
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </FormikProvider>
    </Dialog>
  );
}

const textFieldStyle = {
  margin: '13px 0'
};
