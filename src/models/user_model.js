import mongoose, { Schema } from 'mongoose';

// create a UserSchema with a title field
const UserSchema = new Schema({
  id: { type: String, unique: true, lowercase: true },
},
{
  toJSON: {
    virtuals: true,
  },
});

// TODO: add in Spotify Auth for saving users

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
