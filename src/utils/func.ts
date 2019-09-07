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

export const getPostingTimeString = (createdAt: Date) => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const elapsed = new Date(diff);

  if (elapsed.getUTCDate() - 1) {
    return `${monthNames[createdAt.getMonth()]} ${createdAt.getDate()}`;
  } else if (elapsed.getUTCHours()) {
    return `${elapsed.getUTCHours()}h ago`;
  } else if (elapsed.getUTCMinutes()) {
    return `${elapsed.getUTCMinutes()}m ago`;
  } else {
    return `${elapsed.getUTCSeconds()}s ago`;
  }
};

export const getPostingTimeStringAll = (createdAt: Date) => {
  const hours = ('0' + createdAt.getHours()).slice(-2);
  const minutes = ('0' + createdAt.getMinutes()).slice(-2);
  const month = monthNames[createdAt.getUTCMonth()];
  const date = createdAt.getUTCDate();
  const year = createdAt.getUTCFullYear();
  return `${hours}:${minutes} ${month} ${date}, ${year}`;
};
