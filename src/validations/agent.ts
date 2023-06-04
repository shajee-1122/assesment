import Joi, { ObjectSchema } from 'joi';
import { Agent } from '../types/types';

const AgentObj = Joi.object().keys({
  _id: Joi.string().allow(""),
  firstName: Joi.string().required().max(256),
  lastName: Joi.string().required().max(256),
  email: Joi.string().required().max(256),
  contactNumber: Joi.string().required().allow('').max(100),
  profileImageUrl: Joi.string().allow('').max(256),
});

export const createAgentValidation: { body: ObjectSchema<Agent> } = {
  body: AgentObj
};

export const createAgentBulkValidation = {
  body: {
    data: Joi.array().items(AgentObj)
  }
};

export const getAgentValidation = {
  params: Joi.object().keys({
    id: Joi.string().required()
  })
};
