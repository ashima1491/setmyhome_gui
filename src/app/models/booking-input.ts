import { Furniture } from './furniture';

export interface BookingInput {

     bookingId: number;
	 eventId : number;
	 personId: string;

	 furnitureList: Furniture[];

	 timeSlot: string;

}
