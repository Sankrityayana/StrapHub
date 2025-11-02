import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: String },
    tags: [{ type: String }],
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
