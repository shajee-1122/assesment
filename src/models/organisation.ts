import { Model, model, Schema } from 'mongoose';
import { Organisation as OrganisationModelType } from '../types/types';

const OrgnizationSchema = new Schema(
  {
    name: {
      type: String
    },
    logoUrl: {
      type: String
    },
    address: {
      type: String
    },
    description: {
      type: String
    },
  },
);

export const Organisation: Model<OrganisationModelType> = model<OrganisationModelType>(
  'organisations',
  OrgnizationSchema
);
