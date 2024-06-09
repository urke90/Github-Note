import { format } from 'date-fns';

export const formatUserCreatedAtDate = (stringDate: string) => {
  const date = new Date(stringDate);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatProjectRangeDate = (stringDate: string) => {
  return format(stringDate, 'MMM dd, yyyy');
};
