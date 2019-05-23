import mongoose, { Schema } from 'mongoose';

// create a UserSchema with a title field
const UserSchema = new Schema({
  code: { type: String, unique: true },
  token: { type: String, unique: true },
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
