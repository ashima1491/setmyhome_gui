import { Bookingviewmodel } from './bookingviewmodel';

export interface Booking {

    bookingId: number,
    eventName: string,
    userName: string,
    userType: string,
    timeSlot: string
  bookingviewmodel: Array<Bookingviewmodel> 
}
