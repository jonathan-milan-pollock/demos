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
    'Saturday'
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
    'December'
];

export const getFormattedDate = (utcDate: string): string => {
    let date = new Date(utcDate);

    let dayOfWeek = date.getDay();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${daysOfWeek[dayOfWeek]}, ${months[month]} ${day}, ${year}`;
};
