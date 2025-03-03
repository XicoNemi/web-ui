import { Category } from '@/types/category';

export const queryStaleTime: number = 8 * 60 * 60;
export const queryRetries = 3;
export const categoryColors = {
  Gastronomia: '#FF5C25',
  Eventos: '#8146A0',
  Hospedaje: '#00B1F3',
  Rutas: '#3AA648',
  Turismo: '#E6077E',
  Itinerarios: '#E6077E',
  Cine: '#00B1F3',
  Otro: '#E6077E',
};
export const categories: Category[] = [
  Category.Hospedaje,
  Category.Gastronomia,
  Category.Eventos,
  Category.Turismo,
  Category.Itinerarios,
  Category.Cine,
  Category.Otro,
];
