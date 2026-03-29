import { Day } from '@prisma/client';

const dayEnum = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

export const getDay = (date: Date): Day => {
  const numberDay = date.getDay();
  const day = dayEnum[numberDay];

  return day;
};

export interface GetTodayAndTomorrow {
  today: Date;
  tomorrow: Date;
}

export const getTodayAndTomorrow = (now: Date): GetTodayAndTomorrow => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  return { today, tomorrow };
};
