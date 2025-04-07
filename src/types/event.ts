export enum EventTypes {
  'GENERAL' = 'General',
  'CULTURAL' = 'Cultural',
  'GASTRONOMICO' = 'Gastronomico',
  'AVENTURA' = 'Aventura',
  'RELAX' = 'Relax',
  'FAMILIAR' = 'Familiar',
  'OTRO' = 'Otro',
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  description: string;
  url_image: null | string;
  startDate: number;
  endDate: number;
  status: boolean;
  type: EventTypes;
}

export interface CreateEvent {
  userId: string;
  businessId: string;
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  type: EventTypes;
}
