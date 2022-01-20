import {
  Container,
  Stack,
  Card,
  Select,
  MenuItem,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, DateTimePicker, LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment';
import { useSelector } from 'react-redux';
import {
  useGetDoctorQuery,
  useGetDoctorScheduleQuery,
  useMakeAppointmentMutation
} from '../redux/medbookAPI';
import BodyPart from '../components/BodyPart';
import MakeAppointmentDialog from '../components/MakeAppointmentDialog';
import { ORGANS_DEFAULT, SPECIALIZATIONS, TIME_PERIOD } from '../constants';

const ORGANS_NAMES = [...Object.keys(ORGANS_DEFAULT)];

export default function MakeAppointment() {
  const [organs, setOrgans] = useState({ ...ORGANS_DEFAULT });
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const { data = [], isLoading } = useGetDoctorQuery(selectedOrgan);
  const [usedSlots, setUsedSlots] = useState([]);
  const MakeAppointmentSchema = Yup.object().shape({
    comment: Yup.string(),
    doctorId: Yup.string().required('Выберите одного из доступных врачей'),
    date: Yup.string(),
    timeSlot: Yup.number()
  });

  const onBodyPartClick = (e, bodyPart) => {
    setSelectedOrgan(bodyPart);
    const falsyObj = Object.keys(ORGANS_DEFAULT).reduce(
      (acc, el) => ({
        ...acc,
        [el]: false
      }),
      {}
    );
    setOrgans({
      ...falsyObj,
      [bodyPart]: true
    });
  };

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [makeAppointment] = useMakeAppointmentMutation();

  const handleMakeAppointment = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      const appointmentInfo = {
        ...formik.values,
        complaints: '',
        objectively: '',
        temp: '',
        pulse: '',
        blood_pressure: '',
        diagnosis: '',
        application: '',
        receipt: '',
        accepted: false
      };

      await makeAppointment(appointmentInfo);
      setShowDialog(true);
    } catch (e) {
      console.error('Не удалось записаться на прием ', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: '',
      doctorId: '',
      patientId: userInfo.email,
      date: moment().format('YYYY-MM-DD'),
      timeSlot: 1,
      accepted: false
    },
    validationSchema: MakeAppointmentSchema,
    onSubmit: handleMakeAppointment
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const [showDialog, setShowDialog] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {showDialog && (
        <MakeAppointmentDialog
          onShow={() => setShowDialog(true)}
          onClose={() => setShowDialog(false)}
        />
      )}
      <Container>
        <Typography variant="h4" gutterBottom>
          Запись к врачу
        </Typography>
        <Typography variant="body1">
          Выберите тот орган, с которым связана ваша проблема:
        </Typography>
        <Grid container spacing={2} justifyContent="space-around">
          {ORGANS_NAMES.map((el, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <BodyPart key={i} imageName={el} onClick={onBodyPartClick} isChecked={organs[el]} />
            </Grid>
          ))}
        </Grid>
        {selectedOrgan && (
          <>
            <Typography variant="h5" gutterBottom>
              Дополнительная информация для записи
            </Typography>
            <Card sx={{ padding: '20px' }}>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      multiline
                      {...getFieldProps('comment')}
                      type="text"
                      label="Комментарий для врача"
                      error={Boolean(touched.comment && errors.comment)}
                      helperText={touched.comment && errors.comment}
                    />

                    <Select
                      disabled={!selectedOrgan || !data.length}
                      {...getFieldProps('doctorId')}
                      placeholder="Врач"
                      error={Boolean(touched.doctorId && errors.doctorId)}
                      helperText={touched.doctorId && errors.doctorId}
                    >
                      {data.map((item) => (
                        <MenuItem key={item.id} value={item.email}>
                          {item.lastName} {item.firstName} ({SPECIALIZATIONS[item.bodyPart]})
                        </MenuItem>
                      ))}
                    </Select>
                    <Stack direction="row">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          renderInput={(props) => <TextField style={{ flex: 1 }} {...props} />}
                          label="Дата приема"
                          value={formik.values.date}
                          minDate={new Date()}
                          maxDate={new Date(new Date().getFullYear(), 11, 31)}
                          onChange={(newValue) => setFieldValue('date', newValue)}
                          error={Boolean(touched.date && errors.date)}
                          helperText={touched.date && errors.date}
                        />
                      </LocalizationProvider>
                      <Select {...getFieldProps('timeSlot')} style={{ marginLeft: '16px' }}>
                        {Object.keys(TIME_PERIOD).map((timeSlot) => (
                          <MenuItem
                            key={timeSlot}
                            value={timeSlot}
                            disabled={timeSlot in usedSlots}
                          >
                            {TIME_PERIOD[timeSlot]}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Записаться на прием
                  </LoadingButton>
                </Form>
              </FormikProvider>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
