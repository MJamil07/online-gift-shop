import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { isEmail, isEmpty } from 'validator';
import { hash, compare } from 'bcrypt';
import mongoose from 'mongoose';

export default class UserController {
       async login(request: Request, response: Response) {
              try {
                     const { email, password } = request.body;

                     if (isEmpty(email) || isEmpty(password)) {
                            return response.status(400).json({ error: 'Email and password are required' });
                     }

                     if (!isEmail(email)) {
                            return response.status(400).json({ error: 'Invalid email format' });
                     }

                     const user: IUser | null = await User.findOne({ email });

                     if (!user) {
                            return response.status(404).json({ error: 'User not found' });
                     }

                     const passwordMatch = await compare(password, user.password);

                     if (!passwordMatch) {
                            return response.status(401).json({ error: 'Invalid password' });
                     }

                     return response.status(200).json({ message: 'Login successful', user });
              } catch (error) {
                     console.error('Error in login:', error);
                     return response.status(500).json({ error: 'Internal server error' });
              }
       }

       async register(request: Request, response: Response) {
              try {
                     const { username, email, password, contact }: IUser = request.body;

                     if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(contact)) {
                            return response.status(400).json({ error: 'All Fields are required' });
                     }
       
                     if (!isEmail(email)) {
                            return response.status(400).json({ error: 'Invalid email format' });
                     }

                     const existingUser = await User.findOne({ email });
       
                     if (existingUser) {
                            return response.status(409).json({ error: 'Email already exists' });
                     }
       
                     const hashPassword = await hash(password, 10);
                     const newUser: IUser = await User.create({ _id : new mongoose.Types.ObjectId() ,  username, email, password: hashPassword, contact });
       
                     return response.status(201).json({ message: 'User registered successfully', user: newUser });
       
              } 
              catch (error) {
                     console.error('Error in registration:', error);
                     return response.status(500).json({ error: 'Internal server error' });
              }
       }
}
