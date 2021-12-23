import React, { useState } from 'react';
import { Typography, Container, Stack, Button, Card } from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';

import { USER } from '../_mocks_/profile';
import { useGetUsersQuery } from '../redux/medbookAPI';

export default function Profile() {
  const [login, setLogin] = useState('zemly@mail.ru');
  const { data = [], isLoading } = useGetUsersQuery(login);
  console.log(data);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Page title="Профиль | Medbook">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Профиль
          </Typography>
        </Stack>
        <Card style={{ padding: 15 }}>
          <Typography variant="h5" gutterBottom>
            {data[0].lastName} {data[0].firstName}
          </Typography>
          <Typography variant="body1">Электронная почта:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {data[0].login}
          </Typography>
          <Typography variant="body1">Дата рождения:</Typography>
          <Typography variant="subtitle1">{data[0].birthDate}</Typography>
        </Card>
      </Container>
    </Page>
  );
}
