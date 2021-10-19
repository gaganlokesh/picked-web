import dayjs from 'dayjs';

const formatDate = (date: Date): string => {
  const instance = dayjs(date);
  const template = instance.year() !== dayjs().year() ? 'D MMM, YYYY' : 'D MMM';

  return instance.format(template);
};

export { formatDate };
