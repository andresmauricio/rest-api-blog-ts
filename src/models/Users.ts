import { Schema, model } from 'mongoose'

const UserSchema = new Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    ceratedAt : { type: Date, default: Date.now() } 
  
});

export default model('users', UserSchema);