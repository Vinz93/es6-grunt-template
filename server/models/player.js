import mongoose from 'mongoose';

import User from './user';

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: 'male female'.split(' '),
            message: '`{VALUE}` is not a valid gender',
        },
    },
    facebookId: {
        type: String,
    },
    twitterId: {
        type: String,
    },
    bornAt: {
        type: Date,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
});

PlayerSchema.virtual('age').get(function() {
    const today = new Date();
    const bornAt = this.bornAt;
    const m = today.getMonth() - bornAt.getMonth();
    let age = today.getFullYear() - bornAt.getFullYear();

    if (m < 0 || (m === 0 && today.getDate() < bornAt.getDate()))
        age--;

    return age;
});



export default User.discriminator('Player', PlayerSchema);

/**

========== discriminators ==============
Discriminators are a schema inheritance mechanism.
They enable you to have multiple models with overlapping schemas
on top of the same underlying MongoDB collection.

for example Player is a subclass of User, so when you create a player it will
a create a new user with more atributes.

http://mongoosejs.com/docs/discriminators.html

*/
