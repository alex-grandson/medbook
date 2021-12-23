import {
  Container,
  Stack,
  Button,
  Card,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, DateTimePicker, LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import { useGetDoctorsQuery } from '../redux/medbookAPI';
import BodyPart from '../components/BodyPart';

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
  const { selectedDoctor, setSelectedDoctor } = useState(null);
  const { selectedDate, setSelectedDate } = useState(new Date('2021-21-23T12:00:00'));
  const { comment, setComment } = useState('');
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

  const formik = useFormik({
    initialValues: {
      comment: '',
      selectedDoctor: undefined,
      selectedDate: undefined
    },
    onSubmit: () => {
      console.log(JSON.stringify(data));
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleChangeDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <Container>
      <Grid container spacing={2} justifyContent="space-around">
        {ORGANS_NAMES.map((el, i) => (
          <Grid item xs={12} sm={6} md={3}>
            <BodyPart key={i} imageName={el} onClick={onBodyPartClick} isChecked={organs[el]} />
          </Grid>
        ))}
      </Grid>
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
              />

              <Select value={selectedDoctor} onChange={handleChangeDoctor} placeholder="Врач">
                {data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.lastName} {item.firstName} ({item.specialization})
                  </MenuItem>
                ))}
              </Select>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Время приема"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            />

            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              Записаться на прием
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Card>
    </Container>
  );
}
