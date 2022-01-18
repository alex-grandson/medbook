// material
import { Box, Container, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
// components
import Page from '../components/Page';

import { TIME_PERIOD } from '../constants';

import { useGetTodayAppointmentsQuery } from '../redux/medbookAPI';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const user = useSelector((state) => state.auth.userInfo);

  const { data: todayAppointments } = useGetTodayAppointmentsQuery(user.email, new Date());

  const humanizeTodayAppointments = (todayAppointments) =>
    todayAppointments
      .map((appointment) => TIME_PERIOD[appointment.timeSlot])
      .join(', ')
      .replace(/,(?=[^,]*$)/, ' и');

  return (
    <Page title="Главная | Medbook">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Добро пожаловать, {user.firstName}! </Typography>
        </Box>
        {user.isDoctor ? (
          <Typography variant="text" color="gray">
            {todayAppointments?.length
              ? `Сегодня у вас есть пациенты в ${humanizeTodayAppointments(
                  todayAppointments
                )}. Проверьте ваше расписание во вкладке "Расписание" для получения более подробной информации`
              : 'Пациенты на сегодняшний день у вас отсутствуют. Сверьтесь с вашим графиком в вкладке "Расписание", чтобы спланировать прием пациентов'}
          </Typography>
        ) : (
          <Typography variant="text" color="gray">
            {todayAppointments?.length
              ? `Напоминаем, что сегодня  Вы записаны к врачу на ${humanizeTodayAppointments(
                  todayAppointments
                )}. Проверьте ваше расписание во вкладке "Мои визиты" для получения более подробной информации`
              : 'Записи на сегодняшний день у вас отсутствуют'}
          </Typography>
        )}

        <Box sx={{ pb: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <img src="/assets/doctors.jpg" alt="doctorsPicture" />
          </div>
        </Box>
        {!user.isDoctor && (
          <Typography variant="text" color="gray">
            Не забывайте регулярно наблюдаться у врача - большую часть заболеваний гораздо легче
            вылечить на ранних стадиях!
          </Typography>
        )}
      </Container>
    </Page>
  );
}
