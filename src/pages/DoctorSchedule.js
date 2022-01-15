import React, { useState } from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import WeekDayCard from '../components/schedule/WeekDayCard';
import Page from '../components/Page';
import { useGetDoctorScheduleQuery } from '../redux/medbookAPI';
import MarkAppointmentDialog from '../components/schedule/MarkAppointmentDialog';

export default function DoctorSchedule() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data = [], isLoading } = useGetDoctorScheduleQuery(userInfo.email);
  const [showModal, setShowModal] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(data[0]?.slots[0].patientId);
  const [selectedUser, setSelectedUser] = useState(undefined);
  if (isLoading) return <p>Загрузка...</p>;

  const groupBy = function (xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const days = groupBy(data, 'date');

  return (
    <Page title="Расписание приема | Medbook">
      <Container>
        {showModal && (
          <MarkAppointmentDialog
            onClose={() => setShowModal(false)}
            onShow={() => setShowModal(true)}
          />
        )}
      </Container>
      {Object.keys(days).map((day) => (
        <WeekDayCard
          key={day}
          day={days[day]}
          onShow={setShowModal}
          setSelectedUser={setSelectedUser}
        />
      ))}
    </Page>
  );
}
