import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IChatSession extends Document {
  userId: Types.ObjectId; // Might be a student doing the search
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const chatSessionSchema = new Schema<IChatSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ChatSession = mongoose.model<IChatSession>('ChatSession', chatSessionSchema);

export default ChatSession;
