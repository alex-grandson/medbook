import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { APPOINTMENTS } from './_mocks_/appointments';
import { TIME_PERIOD } from './constants';
import { useGetDoctorByIdQuery, useGetPatientScheduleQuery } from './redux/medbookAPI';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const { doctor = {}, isLoading } = useGetDoctorByIdQuery(row.doctorId);

  if (isLoading) return <p>Загрузка...</p>;
  if (true) return <p>цуаауа</p>;
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.doctorName}
        </TableCell>
        <TableCell align="left">{row.doctorSpec}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{TIME_PERIOD[row.timeSlot]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginLeft: 5, background: '#FFF' }}>
              <Typography variant="h5" gutterBottom component="div">
                Визит №{row.id}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Протокол приема врача (Офтальмолог)
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Прием:</b> {row.date}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Жалобы:</b> {row.complaints}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Объективно:</b> {row.objectively}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Температура:</b> {row.temp}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>А. Д.:</b> {row.blood_pressure} мм рт.ст.
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Пульс:</b> {row.pulse}’
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Примечание:</b> {row.application}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Диагноз:</b> {row.diagnosis}
              </Typography>
              <Typography style={{ marginBottom: '20px' }} variant="p" gutterBottom component="div">
                <b>Рекомендации:</b> {row.receipt}
              </Typography>

              <Button style={{ marginBottom: 20 }} variant="contained">
                Скачать PDF
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function AppointmentsTable() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { rows = [], isLoading } = useGetPatientScheduleQuery(userInfo.email);
  if (isLoading) return <p>Загрузка...</p>;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Врач</TableCell>
            <TableCell align="left">Специализация</TableCell>
            <TableCell align="left">Дата</TableCell>
            <TableCell align="left">Время</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Тимофей хэлп */}
          {/* {rows.map((row) => ( */}
          {/*  <div>sfwefefgwegwegwegwegew</div> */}
          {/* )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
