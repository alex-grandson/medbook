import React from 'react';
import { Container } from '@mui/material';
import WeekDayCard from '../components/schedule/WeekDayCard';
import Page from '../components/Page';

export default function DoctorSchedule() {
  const data = [
    {
      doctorId: 2,
      date: '2022-01-09',
      slots: [
        {
          timeSlot: 1,
          patientId: 1,
          firstName: 'Петр Валерьевич',
          lastName: 'Землянский',
          message: 'Курсач вот чет поднывает'
        },
        {
          timeSlot: 2,
          patientId: 1,
          firstName: 'Петр Валерьевич',
          lastName: 'Землянский',
          message: 'И сессия пиздец'
        },
        {
          timeSlot: 5,
          patientId: 1,
          firstName: 'Герман Данилович',
          lastName: 'Фирштейн',
          message: 'Сосудики проверить там можно да'
        }
      ]
    },
    {
      doctorId: 2,
      date: '2022-01-10',
      slots: [
        {
          timeSlot: 2,
          patientId: 1,
          firstName: 'Петр Валерьевич',
          lastName: 'Землянский',
          message: 'А пересдать можно да'
        },
        {
          timeSlot: 3,
          patientId: 1,
          firstName: 'Петр Валерьевич',
          lastName: 'Землянский',
          message: 'А я просто так пришел'
        },
        {
          timeSlot: 7,
          patientId: 1,
          firstName: 'Герман Данилович',
          lastName: 'Фирштейн',
          message: 'Вот моторчик бы почистить'
        }
      ]
    },
    {
      doctorId: 2,
      date: '2022-01-14',
      slots: [
        {
          timeSlot: 2,
          patientId: 10,
          firstName: 'брат',
          lastName: 'Джума намаз',
          message: 'Не пропусти'
        }
      ]
    }
  ];
  return (
    <Page title="Расписание приема | Medbook">
      <Container>
        {data.map((day) => (
          <WeekDayCard day={day} />
        ))}
      </Container>
    </Page>
  );
}
