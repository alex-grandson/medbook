import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { TIME_PERIOD } from '../../constants';
import { useGetUsersQuery } from '../../redux/medbookAPI';

export default function AppointmentEvent(props) {
  const { slot, onShow, setSelectedUser } = props;
  const { data, isLoading } = useGetUsersQuery(slot.patientId);
  console.log('patientId:', slot.patientId);
  console.log('data:', data);
  const customStackStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  };
  if (isLoading) return <p>Загрузка...</p>;
  return (
    <>
      <Divider />
      <Stack direction="row" style={{ padding: '20px 10px' }}>
        <Stack direction="column" style={{ textAlign: 'center', opacity: 0.75, marginRight: 15 }}>
          <Typography variant="p">{TIME_PERIOD[slot.timeSlot]}</Typography>
          <div style={{ margin: '-7px 0' }}>-</div>
          <Typography variant="p">{TIME_PERIOD[slot.timeSlot + 1]}</Typography>
        </Stack>
        <Stack direction="column" sx={customStackStyles}>
          <div>
            <Typography variant="h6">
              {data[0].lastName} {data[0].firstName}
            </Typography>
            <Typography variant="p">{slot.comment}</Typography>
          </div>

          {/* <Button */}
          {/*  style={{ marginLeft: '16px' }} */}
          {/*  onClick={() => { */}
          {/*    onShow(true); */}
          {/*    setSelectedUser(slot.patientId); */}
          {/*  }} */}
          {/* > */}
          {/*  Отметить */}
          {/* </Button> */}
        </Stack>
      </Stack>
    </>
  );
}
