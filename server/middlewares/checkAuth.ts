import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { DecodedUser, WithAuthRequest } from "../types/Auth";
import { ApiError } from "./errors/ApiError";

export function checkAuth(
  req: WithAuthRequest,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    next(ApiError.forbidden("Token is not found"));
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as DecodedUser;
  req.decoded = decoded;
  console.log(req.decoded);
  next();
}
