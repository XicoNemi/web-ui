import type { Category } from '@/types/category';
import { categoryColors } from '@utils/constants';

export const getCategoryColor = (category: string): string => {
  return categoryColors[category as Category] || 'primary';
};
