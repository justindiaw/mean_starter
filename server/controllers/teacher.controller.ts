import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

import Teacher from '../schemas/teacher.model';

@Controller('api/test')
export class TeacherController {

    @Get('')
    private getMessage(req: Request, res: Response) {
        Teacher.find({}).then(
            result => {
                res.status(200).json(result);
            }
        );
    }

    @Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Post(':msg')
    private postMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
        try {
            throw new Error(req.params.msg);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: req.params.msg,
            });
        }
    }
}
