import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';

const timePeriod = {
  1: '9:00',
  2: '9:30',
  3: '10:00',
  4: '10:30',
  5: '11:00',
  6: '11:30',
  7: '12:00',
  8: '12:30',
  9: '13:00',
  10: '13:30',
  11: '14:00',
  12: '14:30',
  13: '15:00',
  14: '15:30',
  15: '16:00',
  16: '16:30',
  17: '17:00',
  18: '17:30',
  19: '18:00',
  20: '18:30',
  21: '19:00'
};

export default function AppointmentEvent({ event }) {
  return (
    <>
      <Divider />
      <Stack direction="row" style={{ padding: '20px 10px' }}>
        <Stack direction="column" style={{ textAlign: 'center', opacity: 0.75, marginRight: 15 }}>
          <Typography variant="p">{timePeriod[event.timeSlot]}</Typography>
          <div style={{ margin: '-7px 0' }}>-</div>
          <Typography variant="p">{timePeriod[event.timeSlot + 1]}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography variant="h6">
            {event.lastName} {event.firstName}
          </Typography>
          <Typography variant="p">{event.message}</Typography>
        </Stack>
      </Stack>
    </>
  );
}
