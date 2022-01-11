import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Stack, Button, Card } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import Page from '../components/Page';

import EditUserDialog from '../components/EditUserDialog';
import { SPECIALIZATIONS } from '../constants';

export default function DoctorProfile() {
  const userData = useSelector((state) => state.auth.userInfo);

  const [showModal, setShowModal] = useState(false);

  return (
    <Page title="Профиль | Medbook">
      {showModal && (
        <EditUserDialog onClose={() => setShowModal(false)} onShow={() => setShowModal(true)} />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Профиль врача
          </Typography>
        </Stack>
        <Card style={{ padding: 15 }}>
          <Typography variant="h5" gutterBottom>
            {userData?.lastName} {userData?.firstName}
          </Typography>
          <Typography variant="body1">Электронная почта:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {userData?.login}
          </Typography>
          <Typography variant="body1">Дата рождения:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {userData?.birthDate}
          </Typography>
          <Typography variant="body1">Специализация:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {SPECIALIZATIONS[userData?.bodyPart]}
          </Typography>
          <Button
            sx={{ marginTop: '8px' }}
            aria-label="delete"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setShowModal(true)}
          >
            Изменить информацию
          </Button>
        </Card>
      </Container>
    </Page>
  );
}
