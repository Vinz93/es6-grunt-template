import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import paginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import randtoken from 'rand-token';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
      type: String,
      required: true,
      validate: validate({
        validator: 'isEmail',
        message: 'not a valid email',
      }),
      unique: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
    },
    sessionToken: {
      type: String,
      required: false,
    }
});

UserSchema.methods = {
  authenticate(password) {
    return crypto.createHash('md5').update(password).digest('hex') === this.password;
  },

  generateToken() {
    return `${this._id}${randtoken.generate(16)}`;
  },

  createSessionToken() {
    this.sessionToken = this.generateToken();
  }


};

UserSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next();

  this.password = crypto.createHash('md5').update(this.password).digest('hex');

  next();
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(paginate);

export default mongoose.model('User', UserSchema);


/**
 pre middleware,
 paginate
 crypto


*/
