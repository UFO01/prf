import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    Username: string;
    Password: string;
    isAdmin: boolean;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

const SALT_FACTOR = 10;

UserSchema.pre<IUser>('save', function(next) {
    const user = this;

    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.Password, salt, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            user.Password = hashedPassword;
            next();
        });
    });

});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this;
    bcrypt.compare(candidatePassword, user.Password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
}

export const User: Model<IUser> = mongoose.model<IUser>('Users', UserSchema);