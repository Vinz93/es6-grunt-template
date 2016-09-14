import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import paginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import randtoken from 'rand-token';
import timeUnit from 'time-unit';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        validate: validate({
            validator: 'isEmail',
            message: 'not a valid email',
        }),
        unique: true,
        uniqueCaseInsensitive: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    sessionToken: {
        type: String,
    },
    verificationToken: {
        type: String,
    },
    recoveryToken: {
        type: String,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true
});

UserSchema.methods = {
    authenticate(password) {
        return crypto.createHash('md5').update(password).digest('hex') === this.password;
    },
    expiredVerification(time) {
        const limit = timeUnit.hours.toMillis(time);
        if (Date.now() - this.createdAt.getTime() > limit)
            return true;
        return false;
    },
    generateToken() {
        return `${this._id}${randtoken.generate(16)}`;
    },

    createSessionToken() {
        this.sessionToken = this.generateToken();
    },
    createVerificationToken() {
        this.verificationToken = this.generateToken();
    },
    createRecoveryToken() {
        this.recoveryToken = this.generateToken();
    }


};

UserSchema.pre('save', function(next) {
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
 timeUnit

 timestamps options, add the create_at and update_at fields to the model .

 sparce: true , allows to have null values in a field with unique restrictions.


*/
