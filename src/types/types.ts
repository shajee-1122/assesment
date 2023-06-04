import { Error } from 'mongoose';

export interface APIError extends Error {
  statusCode: number;
  isOperational?: boolean | undefined;
}

export interface Organisation {
  _id?: string;
  name: string;
  logoUrl: string;
  address: string;
  description: string;
}

export interface Agent {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  profileImageUrl: string;
}

export interface Listing {
  _id?: string;
  agent: string;
  organisation: string;
  title: string;
  description: string;
  status: string;
  listingType: string;
  listingSector: string;
  unit: {};
  images: [];
}