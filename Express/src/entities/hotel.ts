import mongoose, { Model, Schema } from 'mongoose';

interface IHotel extends Document {
    Id: number;
    Name: string;
    ExtraServices: string;
}

const HotelSchema: Schema<IHotel> = new mongoose.Schema({
    Id: { type: Number, required: true },
    Name: { type: String, required: true },
    ExtraServices: { type: String, required: true }
});

export const Hotel: Model<IHotel> = mongoose.model<IHotel>('Hotels', HotelSchema);