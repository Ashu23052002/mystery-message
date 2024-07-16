import mongoose, { Schema, Document} from "mongoose";

// making a data type define
// only for typescript
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// making schema
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Date a data type hai in typescript
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;

  // ye message ka array MessageSchema se aa ra hai
  messages: Message[];
}

// making Schema
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,

    // spaces remove karta hai from beginning and end
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

// next js ko pata nahi rahta hai ki model pahele se hai ya 1st time ban raha hai
// (already formed hai model) || (1st time form ho raha hai)
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
