import React, { useState } from 'react';
import { Typography, Container, Stack, Button, Card } from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';

import { DOCTORS } from '../_mocks_/doctor';

import { useGetDoctorsQuery } from '../redux/medbookAPI';

export default function DoctorProfile() {
  const [user, setUser] = useState(DOCTORS[0]);
  const { data = [], isLoading } = useGetDoctorsQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Page title="Профиль | Medbook">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Профиль врача
          </Typography>
        </Stack>
        <Card style={{ padding: 15 }}>
          <Typography variant="h5" gutterBottom>
            {user.lastName} {user.firstName}
          </Typography>
          <Typography variant="body1">Электронная почта:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {user.login}
          </Typography>
          <Typography variant="body1">Дата рождения:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {user.birthDate}
          </Typography>
          <Typography variant="body1">Специализация:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {user.specialization}
          </Typography>
        </Card>
      </Container>
    </Page>
  );
}
