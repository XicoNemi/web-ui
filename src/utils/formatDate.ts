import { unix } from 'dayjs';

export const formatDate = (timestamp: number): string => {
  return unix(timestamp).format('DD/MM/YYYY hh:mm');
};
