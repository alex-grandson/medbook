import React, { useState } from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import WeekDayCard from '../components/schedule/WeekDayCard';
import Page from '../components/Page';
import { useGetScheduleQuery } from '../redux/medbookAPI';
import MarkAppointmentDialog from '../components/schedule/MarkAppointmentDialog';

export default function DoctorSchedule() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data = [], isLoading } = useGetScheduleQuery(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(data[0]?.slots[0].patientId);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Page title="Расписание приема | Medbook">
      <Container>
        {showModal && (
          <MarkAppointmentDialog
            onClose={() => setShowModal(false)}
            onShow={() => setShowModal(true)}
          />
        )}
        {data.map((day, idx) => (
          <WeekDayCard
            key={idx}
            day={day}
            onShow={setShowModal}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </Container>
    </Page>
  );
}
