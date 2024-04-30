import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = Router();

router.get('/', FacultyController.readMultiple);

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.create),
  FacultyController.create
);

router.get('/:id', FacultyController.readSingle);

export const FacultyRouter = router;
