// models/Shame.js
import mongoose from 'mongoose';

const shameSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    tags: [String],
    isAnonymous: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shame = mongoose.model('Shame', shameSchema);

export default Shame;
