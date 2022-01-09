import React, { useState } from 'react';
import { Typography, Container, Stack, Button, Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { Edit as EditIcon } from '@mui/icons-material';
import Page from '../components/Page';
import EditPatientDialog from '../components/EditPatientDialog';

export default function Profile() {
  const userData = useSelector((state) => state.auth.userInfo);

  const [showModal, setShowModal] = useState(false);

  return (
    <Page title="Профиль | Medbook">
      {showModal && (
        <EditPatientDialog onClose={() => setShowModal(false)} onShow={() => setShowModal(true)} />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Профиль
          </Typography>
        </Stack>
        <Card style={{ padding: 15 }}>
          <Typography variant="h5" gutterBottom>
            {userData?.lastName} {userData?.firstName}
          </Typography>
          <Typography variant="body1">Электронная почта:</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {userData?.email}
          </Typography>
          <Typography variant="body1">Дата рождения:</Typography>
          <Typography variant="subtitle1">{userData?.birthDate}</Typography>
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
