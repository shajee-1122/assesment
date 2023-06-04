import { Router } from 'express';
import {
  createAgentBulkValidation,
  createAgentValidation,
  getAgentValidation,
} from '../validations/agent';
import { validate } from '../middlewares/validate';

import {
  saveAgent,
  saveAgents,
  getAgent,
  getAgents
} from '../controllers/agent';

const router: Router = Router();

router
  .route('/')
  .get(getAgents)
  .post(validate(createAgentValidation), saveAgent)

router.post(
  '/bulk',
  validate(createAgentBulkValidation),
  saveAgents
);

router
  .route('/:id')
  .get(validate(getAgentValidation), getAgent)

export default router;