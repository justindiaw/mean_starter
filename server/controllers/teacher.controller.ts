import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
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

    @Put(':id')
    private putTeachers(req: Request, res: Response) {
        Teacher.findById(req.params.id, (err, teacher) => {
            if (req.body._id) {
                delete req.body._id;
            }
            for (const property in req.body ) {
                if (req.body.hasOwnProperty(property)) {
                    teacher[property] = req.body[property];
                }
            }
            teacher.save();
            res.json(teacher);
        });
    }

    @Post('')
    private updateTeacher(req: Request, res: Response): void {
        const newTeacher = new Teacher({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        newTeacher.save().then(result => {
            res.status(200).json(result);
        });
    }

    @Delete(':id')
    private deleteTeacher(req: Request, res: Response) {
        Teacher.findById(req.params.id, (error, teacher) => {
            teacher.remove(error2 => {
                if (error2) {
                    res.status(500).send(error2);
                } else {
                    res.status(204).send('removed');
                }
            });
        });
    }
}
