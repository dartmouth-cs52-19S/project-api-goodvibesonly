import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const PlaylistSchema = new Schema({
    title: { type: String, unique: true, lowercase: true },
    author: { type: String },
    songs : [{
        name : String,
        artist : String
         }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  });

  // create UserModel class from schema
const PlaylistModel = mongoose.model('Playlist', UserSchema);


export default PlaylistModel;