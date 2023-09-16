const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
        lastName: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true
		},
		password: {
			type: String,
			trim: true,
			minlength: 3,
			required: true
		},
		profilePicture: { type: String },
        mbtiType: { type: String },
        favoritePeriod: { type: String },
        favoriteSubGenre: { type: String },
        favoriteMood: { type: String },
        favoritePiece: { type: String },
        favoriteComposer: { type: String },
        favoritePerformer: { type: String },
        favoriteInstrument: { type: String },
        playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password;
				return ret;
			}
		}
	}
);

userSchema.pre('save', async function(next) {
	// 'this' is the use document
	if (!this.isModified('password')) return next();
	// update the password with the computed hash
	this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
	return next();
  });

module.exports = mongoose.model('User', userSchema);