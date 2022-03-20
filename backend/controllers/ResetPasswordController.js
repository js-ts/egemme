import User from '../models/userModel.js';
import UserToken from '../models/UserTokenModel.js';
import asyncHandler from 'express-async-handler';
import { sendMailFake } from '../utils/sendEmailFake.js';
import { sendMailReal } from '../utils/sendEmailReal.js';

import { differenceInMinutes } from 'date-fns';
import path from 'path';
export const sendForgotPasswordEmail = asyncHandler(
  async (request, response)  => {
    const { email } = request.body;
    const user = await User.findOne({ email });
 
    if (!user) {
      throw new Error('User not found');
    }

    const token = await new UserToken().generateToken();

    const userToken = await UserToken.create({
      resetPasswordToken: token,
      user_id: user._id,
    });

    const URL = `${process.env.APP_URL}/reset-password?token=${token}`;

    // const templatePath = path.resolve(
    //   __dirname,
    //   '..',
    //   'views',
    //   'forgot-password.hbs'
    // );
    // console.log(__dirname)
const templatePath ='C:\Users\Vedant\projects\typescript\typescript transition\s66s\ecommerce-1\backend\views\forgot-password.hbs'

    if (process.env.NODE_ENV === 'development') {
      await sendMailFake({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: 'Recuperação de senha',
        templateData: {
          file: templatePath,
          variables: {
            name: user.name,
            link: URL,
          },
        },
      });
    } else {
      await sendMailReal({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: 'Recuperação de senha',
        templateData: {
          file: templatePath,
          variables: {
            name: user.name,
            link: URL,
          },
        },
      });
    }

    return response
      .status(200)
      .json(
        'Email sent successfully, check your inbox, junk mail or spam'
      );
  }
);

export const resetPassword = asyncHandler(
  async (request, response)  => {
    const { token, password, confirm_password } = request.body;
    const userToken = await UserToken.findOne({ resetPasswordToken: token });

    if (!userToken) {
      throw Error('Token does not exists');
    }

    const user = await User.findById(userToken.user_id);

    if (!user) {
      throw Error('User does not exists');
    }

    let minutes;
    if (userToken.createdAt) {
      minutes = differenceInMinutes(new Date(), userToken.createdAt);

      //throw a error if token is greater than 30 minutes
      if (minutes > 30) {
        throw Error('Token expired');
      }
    }

    if (password !== confirm_password) {
      throw Error('Confirm password different from password');
    }

    user.password = password;

    await user.save();

    return response.status(200).json('Password change successfully');
  }
);
