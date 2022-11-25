import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  customer_id: {
    type: Number,
    required: true,
    unique: true,
  }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
