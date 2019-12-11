import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

import Teacher from '../schemas/teacher.model';

@Controller('api/teachers')
export class TeacherController {

    @Get('')
    private getTeachers(req: Request, res: Response): void {
        Teacher.find({}).then(
            result => {
                res.status(200).json(result);
            }
        );
    }

    @Put('')
    private putTeachers(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Post('')
    private addTeacher(req: Request, res: Response): void {
        console.log(req.body);
        const newTeacher = new Teacher({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        // res.sendStatus(200).json({});
        newTeacher.save().then(result => {
            console.log(result);
            res.status(200).json(result);
        });
    }

    @Delete('')
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
