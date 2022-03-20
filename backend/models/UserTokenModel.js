import mongoose from 'mongoose';
import crypto from 'crypto';
import { promisify } from 'util';


const UserTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resetPasswordToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserTokenSchema.methods.generateToken = async function generateToken() {
  const randBytes = promisify(crypto.randomBytes);
  const bytes = await randBytes(20).catch((error) => {
    throw new error();
  });
  return bytes.toString('hex');
};

const UserToken = mongoose.model(
  'UserToken',
  UserTokenSchema
);

export default UserToken;
