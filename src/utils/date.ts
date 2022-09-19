/* eslint-disable import/no-anonymous-default-export */
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
export const getMonthDays = (month = thisMonth, year = thisYear) => {
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

export default (month = thisMonth, year = thisYear) => {
  // Get number of days in the month and the month's first day
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = calendarWeeks * 7 - (daysFromPrevMonth + monthDays);

  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
