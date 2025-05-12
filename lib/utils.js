import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export const formatChartYAxis = (value, chartMetric) => {
  if (chartMetric === 'tokens') {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
  }

  // Format currency values
  if (chartMetric === 'revenue' || chartMetric === 'cost') {
    return value >= 1000000
      ? `$${(value / 1000000).toFixed(1)}M`
      : value >= 1000
      ? `$${(value / 1000).toFixed(1)}K`
      : `$${value}`;
  }

  // Format percentage values
  if (chartMetric === 'percentage') {
    return `${value}%`;
  }

  return value.toString();
};
