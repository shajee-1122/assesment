import { Model, model, Schema } from 'mongoose';
import { Agent as AgentModelType} from '../types/types';

const AgentSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    contactNumber: {
      type: String
    },
    profileImageUrl: {
      type: String
    },
  },
);

export const Agent: Model<AgentModelType> = model<AgentModelType> (
  'Agents',
  AgentSchema
);
