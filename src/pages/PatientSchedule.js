import React, { useState } from 'react';
import { Typography, Container, Stack, Button } from '@mui/material';
import Page from '../components/Page';
import AppointmentsTable from '../AppointmentsTable';

export default function PatientSchedule() {
  return (
    <Page title="Посещения | Medbook">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Мои визиты
          </Typography>
          <Button variant="contained">Скачать PDF</Button>
        </Stack>
        <AppointmentsTable />
      </Container>
    </Page>
  );
}
