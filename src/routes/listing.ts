import { Router } from 'express';
import {
  createListingBulkValidation,
  createListingValidation,
  getListingValidation,
} from '../validations/listing';
import { validate } from '../middlewares/validate';

import {
  saveListing,
  saveBulkListing,
  getListing,
  getlistings
} from '../controllers/listing';

const router: Router = Router();

router
  .route('/')
  .get(getlistings)
  .post(validate(createListingValidation), saveListing)

router.post(
  '/bulk',
  validate(createListingBulkValidation),
  saveBulkListing
);

router
  .route('/:id')
  .get(validate(getListingValidation), getListing)

export default router;
