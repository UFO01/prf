export interface Booking extends Document {
    Id: number;
    UserId: number;
    From: Date;
    Until: Date;
}
