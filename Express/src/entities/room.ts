import mongoose, { Model, Schema } from 'mongoose';
import { BookingSchema, IBooking } from './booking';

export interface IRoom extends Document {
    Id: number;
    UserId: number;
    PricePerNight: number;
}


export const RoomSchema: Schema<IRoom> = new mongoose.Schema({
    Id: { type: Number, required: true },
    UserId: { type: Number, required: true },
    PricePerNight: { type: Number, required: true }
});

export const Room: Model<IRoom> = mongoose.model<IRoom>('Rooms', RoomSchema);