import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = Router();

router.get('/', StudentController.readMultiple);

router.post(
  '/create',
  validateRequest(StudentValidation.create),
  StudentController.create
);

router.get('/:id', StudentController.readSingle);

router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.update
);

router.delete('/:id', StudentController.deleting);

export const StudentRouter = router;
