import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

const { JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_KEY, JWT_TOKEN_TIME } =
  process.env;

export const signAccessToken = async (userId) => {
  try {
    const accessToken = await Jwt.sign({ id: userId }, JWT_ACCESS_TOKEN_KEY, {
      expiresIn: JWT_TOKEN_TIME,
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};
export const signRefreshToken = async (userId) => {
  try {
    const refreshToken = await Jwt.sign({ id: userId }, JWT_REFRESH_TOKEN_KEY, {
      expiresIn: 365 * 24 * 60 * 60,
    });
    const expRf = await Jwt.verify(refreshToken, JWT_REFRESH_TOKEN_KEY);
    return { refreshToken, expRf };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkValidToken = async (token, JWT_KEY) => {
  try {
    const user = await Jwt.verify(token, JWT_KEY);
    return {
      status: true,
      user,
      token,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      status: false,
      token,
      errorMessage,
    };
  }
};

export const filterValidToken = async (token) => {
  try {
    const accessToken = await checkValidToken(token, JWT_ACCESS_TOKEN_KEY);
    const refreshToken = await checkValidToken(token, JWT_REFRESH_TOKEN_KEY);

    if (!accessToken.status && !refreshToken.status) {
      return {
        message: "Error accessToken & refreshToken",
        status: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    if (accessToken.status && refreshToken.status) {
      return {
        message: "accessToken & refreshToken",
        status: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    if (accessToken.status) {
      return {
        message: "accessToken",
        status: true,
        accessToken: accessToken,
      };
    }
    if (refreshToken.status) {
      return {
        message: "refreshToken",
        status: true,
        refreshToken,
      };
    }
  } catch (error) {
    return error.message;
  }
};

export const checkToken = async (req, res) => {
  const { token } = req.params;

  const accessToken = await checkValidToken(token, JWT_ACCESS_TOKEN_KEY);
  const refreshToken = await checkValidToken(token, JWT_REFRESH_TOKEN_KEY);

  if (!accessToken.status && !refreshToken.status) {
    return res.status(200).json({
      message: "Error accessToken & refreshToken",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
  if (accessToken.status && refreshToken.status) {
    return res.status(200).json({
      message: "accessToken & refreshToken",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
  if (accessToken.status) {
    return res.status(200).json({
      message: "accessToken",
      accessToken: accessToken,
    });
  }
  if (refreshToken.status) {
    return res.status(200).json({
      message: "refreshToken",
      accessToken: accessToken,
    });
  }
};
