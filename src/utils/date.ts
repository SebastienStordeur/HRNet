import { getTTFB } from "web-vitals";

export const thisYear = +new Date().getFullYear();
export const thisMonth = +new Date().getMonth() + 1;

export const calendarDays = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

export const calendarMonth = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

//Weeks displayed in Calendar
export const calendarWeeks: number = 6;

export const zeroPad = (value: any, length: number) => {
  return `${value}`.padStart(length, "0");
};

//Number of days in a month for a giver year (28 to 31)
export const getMonthsDays = (month = thisMonth, year = thisYear) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const getMonthFirstDay = (month = thisMonth, year = thisYear) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

//Check if value is a date
export const isDate = (date: any) => {
  const isDate: boolean =
    Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate: boolean = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

//Check if two date values are of the same month and year
export const isSameMonth = (date: any, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

// Check if two date values are the same day
export const isSameDay = (date: any, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;
  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
};

// (string) Formats the given date as YYYY-MM-DD
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;
  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2),
  ].join("-");
};

export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};
