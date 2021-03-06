import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import * as moment from 'moment';
import 'moment/locale/ru';
import AppointmentEvent from './AppointmentEvent';

export default function WeekDayCard(props) {
  const { day, setSelectedUser } = props;
  const { date } = day && day[0];
  return (
    <Card style={{ padding: 30, marginBottom: 30 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        alignContent="center"
      >
        <Typography variant="h4" gutterBottom style={{ textTransform: 'capitalize' }}>
          {moment(date).format('dddd')}
        </Typography>
        <Typography variant="p" style={{ textTransform: 'uppercase' }}>
          {moment(date).format('DD.MM')}
        </Typography>
      </Stack>
      {day?.map((slot, idx) => (
        <AppointmentEvent key={idx} slot={slot} setSelectedUser={setSelectedUser} />
      ))}
    </Card>
  );
}
