import { EventDate, EventDateable } from '@dark-rush-photography/best-of/types';

export const findYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getFormattedDate = (eventDate: EventDate | null): string => {
  if (!eventDate) return '';
  const date = new Date(eventDate.year, eventDate.month - 1, eventDate.day);

  const dayOfWeek = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${daysOfWeek[dayOfWeek]}, ${months[month]} ${day}, ${year}`;
};

export const compareEventDate = (
  a: EventDateable,
  b: EventDateable
): number => {
  if (!a.eventDate && !b.eventDate) return 0;
  if (!a.eventDate) return 1;
  if (!b.eventDate) return -1;

  const firstEventDate = new Date(
    a.eventDate.year,
    a.eventDate.month,
    a.eventDate.day
  );
  const secondEventDate = new Date(
    b.eventDate.year,
    b.eventDate.month,
    b.eventDate.day
  );

  if (firstEventDate < secondEventDate) {
    return 1;
  }
  if (firstEventDate > secondEventDate) {
    return -1;
  }

  return 0; // equal
};
