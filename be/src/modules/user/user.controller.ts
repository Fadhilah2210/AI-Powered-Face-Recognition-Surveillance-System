import { NextFunction, Request, Response } from 'express';
import { getAllUsersService, getUserProfileService } from './user.service';

export const getUserProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const accessToken = authorization.split(' ')[1];
        const response = await getUserProfileService(accessToken);

        res.status(200).json({ message: 'User data fetched', data: response });
    } catch (error) {
        next(error);
    }
};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const search = req.query.search;
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(404).json({ message: 'Users not found' });
            return;
        }

        const accessToken = authorization.split(' ')[1];
        const response = await getAllUsersService(accessToken, search as string);

        res.status(200).json({ message: 'User data fetched', data: response });
    } catch (error) {
        next(error);
    }
}
