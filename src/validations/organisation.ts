import Joi, { ObjectSchema } from 'joi';
import { Organisation } from '../types/types';

const OrganisationObj = Joi.object().keys({
  _id: Joi.string().allow(""),
  name: Joi.string().required().max(200),
  logoUrl: Joi.string().allow('').max(200),
  address: Joi.string().allow('').max(500),
  description: Joi.string().allow(''),
});

export const createOrganisationValidation: { body: ObjectSchema<Organisation> } = {
  body: OrganisationObj
};

export const createOrganisationBulkValidation = {
  body: {
    data: Joi.array().items(OrganisationObj)
  }
};

export const getOrganisationValidation = {
  params: Joi.object().keys({
    id: Joi.string().required()
  })
};
