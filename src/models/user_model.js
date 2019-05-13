import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a UserSchema with a title field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String },
},
{
  toJSON: {
    virtuals: true,
  },
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // TODO: do stuff here
  // Referenced https://github.com/dcodeIO/bcrypt.js documentation to generate a salt
  // and hash user.password with the salt
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // overwrite plain text password with encrypted password
  user.password = hash;
  return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // Referenced https://github.com/dcodeIO/bcrypt.js documentation for the code below, which to compares passwords.
  const user = this;

  // Load hash from your password DB.
  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, res);
    }
  });
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
