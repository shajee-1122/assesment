import Joi, { ObjectSchema } from 'joi';
import { Listing } from '../types/types';

const ListingObj = Joi.object().keys({
  _id: Joi.string().allow(""),
  agent: Joi.string().required().max(200),
  organisation: Joi.string().required().max(200),
  title: Joi.string().required().max(256),
  description: Joi.string().allow('').max(2500),
  status: Joi.string().required().max(14),
  listingType: Joi.string().required().max(20),
  listingSector: Joi.string().required().allow(''),
  unit: Joi.object().allow(''),
  images: Joi.array().allow(''),
});

export const createListingValidation: { body: ObjectSchema<Listing> } = {
  body: ListingObj
};

export const createListingBulkValidation = {
  body: {
    data: Joi.array().items(ListingObj)
  }
};

export const getListingValidation = {
  params: Joi.object().keys({
    id: Joi.string().required()
  })
};

