const {
  Schema,
  Types: { ObjectId },
  model,
} = require('mongoose');

const characterSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  imageUrl: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
    match: [/^https?:\/\//, 'URL is not valid!'],
  },
  createdBy: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  performedBy: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  firstAppearance: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  famousLine: {
    type: String,
    trim: true,
    required: [true, 'All fields required!'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  usersLiked: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  usersFavorited: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  _ownerId: {
    type: ObjectId,
  },
  createdAt: {
    type: Date,
  },
  lastEdit: {
    type: Date,
  },
  _ownerUsername: {
    type: String,
  },
});

const Character = model('Character', characterSchema);

module.exports = Character;
