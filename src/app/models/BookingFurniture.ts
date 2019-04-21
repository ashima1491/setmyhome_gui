import { Booking } from './booking';
import {Furniture } from './furniture';

export interface BookingFurniture {
  booking: Booking,
  furniture: Furniture,
  count: number
}
