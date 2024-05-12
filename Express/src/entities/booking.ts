import mongoose, { Model, Schema } from 'mongoose';
import { RoomSchema, IRoom } from './room'

export interface IBooking extends Document {
    Id: number;
    UserId: number;
    From: Date;
    Until: Date;
}

export const BookingSchema: Schema<IBooking> = new mongoose.Schema({
    Id: { type: Number, required: true },
    UserId: { type: Number, required: true },
    From: { type: Date, required: true },
    Until: { type: Date, required: true }
});

export const Booking: Model<IBooking> = mongoose.model<IBooking>('Bookings', BookingSchema);


