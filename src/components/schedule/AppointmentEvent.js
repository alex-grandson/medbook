import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { timePeriod } from '../../constants';

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
