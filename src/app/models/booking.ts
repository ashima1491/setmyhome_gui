import { BookingFurniture } from './BookingFurniture';
import { User } from './user';
import { Event } from './event';

export interface Booking {

     bookingId: number,
     event: Event,
     person: User,
     bookedFurniture: BookingFurniture[],
     timeSlot: string

    // eventName: string,
    // userName: string,
    // userType: string,
   
    // bookingviewmodel: Array<Bookingviewmodel>
    
    
}
