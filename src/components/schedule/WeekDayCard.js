import React from 'react';
import { Card, Stack, Typography } from '@mui/material';
import * as moment from 'moment';
import 'moment/locale/ru';
import AppointmentEvent from './AppointmentEvent';

export default function WeekDayCard(props) {
  const { day } = props;
  console.log(day);
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
          {moment(day.date).format('dddd')}
        </Typography>
        <Typography variant="p" style={{ textTransform: 'uppercase' }}>
          {moment(day.date).format('DD.MM')}
        </Typography>
      </Stack>
      {day.slots.map((slot) => (
        <AppointmentEvent event={slot} />
      ))}
    </Card>
  );
}
