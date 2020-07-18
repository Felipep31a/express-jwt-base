import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../models/entity/User";

export interface IRequest extends Request {
  user: User;
}

export const checkRole = (roles: Array<string> = []) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(
        id);
      delete user.password;
      req.user = user;
    } catch (err) {
      res.status(401).send();
    }

    if (user.role == "ADMIN") next();
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
