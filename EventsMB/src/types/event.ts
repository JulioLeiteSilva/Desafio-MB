// src/types/events.ts

export interface Event {
  id: number;
  seller: string;
  eventName: string;
  dateTime: string;
  imageUrl: string;
  location: string;
  description: string;
  value: number;
}
