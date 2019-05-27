import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';


const PlaylistSchema = new Schema({
  title: { type: String, unique: true, lowercase: true },
  author: { type: String },
  songs: [{
    songid: String,
    name: String,
    artist: String,
  }],
  spotifyId: { type: String },
  location: { type: Array },
},
{
  toJSON: {
    virtuals: true,
  },
});

// create UserModel class from schema
const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);


export default PlaylistModel;
