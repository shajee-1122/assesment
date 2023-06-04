import { Router } from 'express';
import {
  createOrganisationBulkValidation,
  createOrganisationValidation,
  getOrganisationValidation,
} from '../validations/organisation';
import { validate } from '../middlewares/validate';

import {
  saveOrganisation,
  saveOrganisations,
  getOrganisation,
  getOrganisations
} from '../controllers/organisation';

const router: Router = Router();

router
  .route('/')
  .get(getOrganisations)
  .post(validate(createOrganisationValidation), saveOrganisation)

router.post(
  '/bulk',
  validate(createOrganisationBulkValidation),
  saveOrganisations
);

router
  .route('/:id')
  .get(validate(getOrganisationValidation), getOrganisation)

export default router;