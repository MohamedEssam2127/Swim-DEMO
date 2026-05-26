import { registerValidator,loginValidator } from "../utils/validators.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerValidator.validate(req.body);
    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }
    const { username, email, password, role, organizationID } = value;
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      const emailError = new Error(
        "Email is already registered, try logging in",
      );
      emailError.statusCode = 400;
      throw emailError;
    }
    const user = await User.create({
      username,
      email,
      passwordHash: password,
      role,
      organizationID,
    });
    const token = generateToken(user._id, user.role);
    res.status(201).json({
      success: true,
      token,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
try {
    const {error,value}=loginValidator.validate(req.body);
    if(error){
        const validationError=new Error(error.details[0].message);
        validationError.statusCode=400;
        throw validationError;
    }

    const{email,password}=value;
    const user=await User.findOne({email});
    if(!user){
        const authError=new Error("Invalid email or password");
        authError.statusCode=401;
        throw authError;
    }
    const isMatch=await bcrypt.compare(password,user.passwordHash);
   if (!isMatch) {
      const authError = new Error('Invalid email or password');
      authError.statusCode = 401;
      throw authError;
    }

const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: 'Logged in successfully'
    });

  } catch (error) {
    next(error);
  }
}
