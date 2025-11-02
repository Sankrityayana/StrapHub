import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    steps: [stepSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
