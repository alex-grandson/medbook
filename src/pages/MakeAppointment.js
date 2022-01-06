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
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker, LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetDoctorsQuery, useMakeAppointmentMutation } from '../redux/medbookAPI';
import BodyPart from '../components/BodyPart';
import MakeAppointmentDialog from '../components/MakeAppointmentDialog';

const ORGANS_DEFAULT = {
  brain: undefined,
  thyroid: undefined,
  liver: undefined,
  gallbladder: undefined,
  stomach: undefined,
  kidneys: undefined,
  bladder: undefined,
  heart: undefined,
  lungs: undefined,
  spleen: undefined,
  pancreas: undefined,
  intestine: undefined,
  reproductive: undefined
};

const ORGANS_NAMES = [...Object.keys(ORGANS_DEFAULT)];

export default function MakeAppointment() {
  const [organs, setOrgans] = useState({ ...ORGANS_DEFAULT });
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const { data = [], isLoading } = useGetDoctorsQuery(selectedOrgan);

  const MakeAppointmentSchema = Yup.object().shape({
    comment: Yup.string(),
    selectedDoctor: Yup.object().required('Выберите одного из доступных врачей'),
    selectedDate: Yup.string()
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

  const [makeAppointment] = useMakeAppointmentMutation();

  const handleMakeAppointment = async () => {
    if (!formik || !formik.isValid) return null;
    try {
      await makeAppointment(formik.values);
      setShowDialog(true);
    } catch (e) {
      console.error('Не удалось записаться на прием ', e);
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: '',
      selectedDoctor: undefined,
      selectedDate: new Date()
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
                      {...getFieldProps('selectedDoctor')}
                      placeholder="Врач"
                      error={Boolean(touched.selectedDoctor && errors.selectedDoctor)}
                      helperText={touched.selectedDoctor && errors.selectedDoctor}
                    >
                      {data.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.lastName} {item.firstName} ({item.specialization})
                        </MenuItem>
                      ))}
                    </Select>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Время приема"
                        value={formik.values.selectedDate}
                        onChange={(newValue) => setFieldValue('selectedDate', newValue)}
                        error={Boolean(touched.selectedDate && errors.selectedDate)}
                        helperText={touched.selectedDate && errors.selectedDate}
                      />
                    </LocalizationProvider>
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
