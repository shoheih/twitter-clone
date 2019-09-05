export const getPostingTimeString = (createdAt: Date) => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const elapsed = new Date(diff);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  if (elapsed.getUTCDate() - 1) {
    return `${monthNames[createdAt.getMonth()]} ${createdAt.getDate()}`;
  } else if (elapsed.getUTCHours()) {
    return `${elapsed.getUTCHours()}h`;
  } else if (elapsed.getUTCMinutes()) {
    return `${elapsed.getUTCMinutes()}m`;
  } else {
    return `${elapsed.getUTCSeconds()}s`;
  }
};
