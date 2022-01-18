import { jsPDF } from 'jspdf';

import { robotoFontBin } from '../fonts/Roboto-Medium-normal';

import { SPECIALIZATIONS } from '../constants';

const makeSinglePage = (info, doc) => {
  doc.setFontSize(10);

  doc.addFileToVFS('MyFont.ttf', robotoFontBin);

  doc.addFont('MyFont.ttf', 'MyFont', 'normal');

  doc.setFont('MyFont');

  doc.setFontSize(14);

  const { appointmentData, doctorData } = info;

  doc.text(`Визит №${appointmentData.id}`, 20, 20);

  const doctorSpecializationName = SPECIALIZATIONS[doctorData.bodyPart];

  doc.setFontSize(12);

  doc.text(
    `Протокол приема врача ${doctorData.lastName} ${doctorData.firstName}(${doctorSpecializationName})`,
    20,
    30
  );

  doc.setFontSize(10);

  doc.text(`Прием: ${appointmentData.date}`, 20, 40);
  doc.text(`Жалобы: ${appointmentData.complaints}`, 20, 50);
  doc.text(`Объективно: ${appointmentData.objectively}`, 20, 60);
  doc.text(`Температура: ${appointmentData.temp}`, 20, 70);
  doc.text(`А. Д.: ${appointmentData.blood_pressure}`, 20, 80);
  doc.text(`Пульс: ${appointmentData.pulse}`, 20, 90);
  doc.text(`Примечание: ${appointmentData.application}`, 20, 100);
  doc.text(`Диагноз: ${appointmentData.diagnosis}`, 20, 110);
  doc.text(`Рекомендации: ${appointmentData.receipt}`, 20, 120);

  doc.setProperties({ title: `Запись к врачу ${appointmentData.date}` });

  return doc;
};

export const makeAppointmentPDF = (info) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  const createdPage = makeSinglePage(info, doc);

  createdPage.save();
};

export const makeAppointmentsPDF = (infoArr) => {
  // eslint-disable-next-line new-cap
  let doc = new jsPDF();
  infoArr.forEach((info, idx) => {
    doc = makeSinglePage(info, doc);
    if (idx !== infoArr.length - 1) doc.addPage();
  });
  doc.save();
};
