import React, { useState } from 'react';
import { Typography, Container, Stack, Button, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Page from '../components/Page';

import { APPOINTMENTS } from '../_mocks_/appointments';

export default function Appointments() {
  const [appointment, setAppointment] = useState(APPOINTMENTS);
  const columns = [
    { field: 'doctorName', headerName: 'Врач', width: 250 },
    { field: 'doctorSpec', headerName: 'Специальность', width: 250 },
    { field: 'meetTime', headerName: 'Время', width: 130 },
    { field: 'meetDate', headerName: 'Дата', width: 130 },
    { field: 'doctorRoom', headerName: 'Кабинет', width: 130 }
  ];

  return (
    <Page title="Посещения | Medbook">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Мои визиты
          </Typography>
        </Stack>
        <Card style={{ padding: 15 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={appointment} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
