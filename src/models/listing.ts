import { Model, model, Schema } from 'mongoose';
import { Listing as ListingModelType } from '../types/types';

const ListingSchema = new Schema(
  {
    agent: {
      type: String,
    },
    organisation: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: String
    },
    listingType: {
      type: String
    },
    listingSector: {
      type: String
    },
    unit: {
      type: Object
    },
    images: {
      type: Array
    },
  },
  {
    versionKey: false
  }
);

export const Listing: Model<ListingModelType> = model<ListingModelType>(
  'listings',
  ListingSchema
);
