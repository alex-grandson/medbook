import React, { useState } from 'react';
import { Typography, Container, Stack, Button } from '@mui/material';
import Page from '../components/Page';
import AppointmentsTable from '../AppointmentsTable';

import { makeAppointmentsPDF } from '../utils/pdf';

export default function PatientSchedule() {
  const [appointmentsInfo, setAppointmentsInfo] = useState([]);

  return (
    <Page title="Посещения | Medbook">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Мои визиты
          </Typography>
          <Button variant="contained" onClick={() => makeAppointmentsPDF(appointmentsInfo)}>
            Скачать PDF
          </Button>
        </Stack>
        <AppointmentsTable
          appointmentsInfo={appointmentsInfo}
          setAppointmentsInfo={setAppointmentsInfo}
        />
      </Container>
    </Page>
  );
}
