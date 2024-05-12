import { PassportStatic } from "passport";
import { User } from "../entities/user";
import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../mainclass'
import { Room } from "../entities/room";
import { Hotel } from "../entities/hotel";
import { Booking } from "../entities/booking";


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {
    //endpoints

    // Log in
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server errror.');
                        } else {
                            console.log('Successful login.');
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    // Register
    router.post('/register', async (req: Request, res: Response ) => {
        console.log("Hellooo");
        const { email, password, isAdmin } = req.body;
        const user = new User({Username: email, Password: password, isAdmin: isAdmin});
        const isExists = await User.findOne( {Username: email} );
        if (isExists) {
            console.log('This email is already taken.');
            res.status(500).send('This email is already taken.');
        } else {
            user.save().then(data => {
                console.log('Successfully registration.');
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
    });

    // Log out
    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error');
                }
                console.log('Successfully logged out.');
                res.status(200).send('Successfully log out.');
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    // Delete user
    router.delete('/delete_user/:userId', async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).send('User successfully deleted.')
        } else {
            res.status(404).send('User not found.');
        }
    });

    // Delete room
    router.delete('/delete_room/:roomId', async (req: Request, res: Response) => {
        const roomId = req.params.roomId;
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (deletedRoom) {
            res.status(200).send('Room successfully deleted.')
        } else {
            res.status(404).send('Room not found.');
        }
    });

    // Delete hotel
    router.delete('/delete_hotel/:hotelId', async (req: Request, res: Response) => {
        const hotelId = req.params.hotelId;
        const deletedHotel = await Room.findByIdAndDelete(hotelId);
        if (deletedHotel) {
            res.status(200).send('Hotel successfully deleted.')
        } else {
            res.status(404).send('Hotel not found.');
        }
    });

    // Delete booking
    router.delete('/delete_booking/:bookingId', async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;
        const deletedBooking = await Room.findByIdAndDelete(bookingId);
        if (deletedBooking) {
            res.status(200).send('Booking successfully deleted.')
        } else {
            res.status(404).send('Booking not found.');
        }
    });

    // Get users
    router.get('/get_users', async (req: Request, res: Response) => {
        const users = await User.find();
        if (users) {
        res.status(200).send(users);
        } else {
        res.status(404).send('There are no users.');
        }
    });

    // Get rooms

    router.get('/get_rooms', async (req: Request, res: Response) => {
        const rooms = await Room.find();
        if (rooms) {
        res.status(200).send(rooms);
        } else {
        res.status(404).send('There are no rooms');
        }
    });

    // Get hotels

    router.get('/get_hotels', async (req: Request, res: Response) => {
        const hotels = await Hotel.find();
        if (hotels) {
        res.status(200).send(hotels);
        } else {
        res.status(404).send('There are no hotels.');
        }
    });

    // Get bookings

    router.get('/get_bookings', async (req: Request, res: Response) => {
        const bookings = await Booking.find();
        if (bookings) {
        res.status(200).send(bookings);
        } else {
        res.status(404).send('There are no bookings.');
        }
    });

    // Create user

    router.get('/create_users', async (req: Request, res: Response) => {
        const { Id, username, password, isAdmin } = req.body;
        const user = new User({ Username: username, Password: password, isAdmin: isAdmin});
        user.save().then(data => {
            console.log('User saved successfully.');
            res.status(200).send(data);
          }).catch(error => {
            res.status(500).send(error);
          });
    });

    // Create rooms

    router.get('/create_rooms', async (req: Request, res: Response) => {
        const { userID, pricePerNight } = req.body;
        const room = new Room({ UserId: userID, PricePerNight: pricePerNight});
        room.save().then(data => {
            console.log('Room saved successfully.');
            res.status(200).send(data);
          }).catch(error => {
            res.status(500).send(error);
          });
    });

    // Create hotels

    router.get('/create_hotels', async (req: Request, res: Response) => {
        const { name, extraServices } = req.body;
        const hotel = new Hotel({ Name: name, ExtraServices: extraServices});
        hotel.save().then(data => {
            console.log('Hotel saved successfully.');
            res.status(200).send(data);
          }).catch(error => {
            res.status(500).send(error);
          });
    });

    // Create bookings

    router.get('/create_bookings', async (req: Request, res: Response) => {
        const { userID, from, until } = req.body;
        const booking = new Booking({ UserId: userID, From: from, Until: until});
        booking.save().then(data => {
            console.log('Booking saved successfully.');
            res.status(200).send(data);
          }).catch(error => {
            res.status(500).send(error);
          });
    });

    // Update users

    router.put('/update_users/:userId', async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const { username, password, isAdmin } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, {
                username,
                password,
                isAdmin
            }, { new: true });
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send('User not found.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error modifying user.');
        }
    });
    

    // Update rooms

    router.put('/update_rooms/:roomId', async (req: Request, res: Response) => {
        try {
            const roomId = req.params.roomId;
            const { userID, pricePerNight } = req.body;
            const updatedRoom = await User.findByIdAndUpdate(roomId, {
                userID,
                pricePerNight
            }, { new: true });
            if (updatedRoom) {
                res.status(200).send(updatedRoom);
            } else {
                res.status(404).send('Room not found (Don\'t mess with room 404).');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error modifying room.');
        }
    });

    // Update hotels

    router.put('/update_users/:hotelId', async (req: Request, res: Response) => {
        try {
            const hotelId = req.params.hotelId;
            const { name, extraServices } = req.body;
            const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
                name,
                extraServices
            }, { new: true });
            if (updatedHotel) {
                res.status(200).send(updatedHotel);
            } else {
                res.status(404).send('Hotel not found.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error modifying hotel.');
        }
    });

    // Update bookings

    router.put('/update_users/:bookingId', async (req: Request, res: Response) => {
        try {
            const bookingId = req.params.bookingId;
            const { userID, from, until } = req.body;
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
                userID,
                from,
                until
            }, { new: true });
            if (updatedBooking) {
                res.status(200).send(updatedBooking);
            } else {
                res.status(404).send('Booking not found.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error modifying booking.');
        }
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    
    return router;
}