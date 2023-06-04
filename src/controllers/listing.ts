import httpStatus from 'http-status';
import {
  INVALID_QUERY_PARAM,
  RECORD_ALREADY_EXIST,
  RECORD_NOT_FOUND
} from '../constants/constants';
import { catchAsync } from '../utils/catchAsync';
import listingService from '../services/listing';
import { Listing } from '../types/types';
import { ApiError } from '../utils/ApiError';
import { Listing as ListingModel } from '../models/listing';
import { isValidObjectId } from 'mongoose';


/**
 * this functtion gets only a single Listing
 * @param listingID query param
 * @returns {object} The requested listing
 */
export const getListing = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_NOT_FOUND);
  }
  const listing: Listing | null =
    await listingService.getListing(id.trim());
  res.status(httpStatus.OK).json({
    data: listing || []
  });
});


/**
 * this functtion gets the list of listing filter by agent or organisation 
 * @param {string} organisationID query string
 * @param {string} agentID query string
 * @returns {array} The requested agents
 */
export const getlistings = catchAsync(async (req, res, next) => {
  if(!req.query.hasOwnProperty("agentID") && 
        !req.query.hasOwnProperty("organisationID")) {
    //sending bad request due to missing query params 
    throw new ApiError(httpStatus.BAD_REQUEST, INVALID_QUERY_PARAM);
  }
  const query = {
      ...(req.query.agentID) && {agent: req.query?.agentID},
      ...(req.query.organisationID) && {organisation: req.query?.organisationID}
  }; 
  const listings: Listing[] = await listingService.getListings(query);
  res.status(httpStatus.OK).json({
    data: listings 
  });
});



/**
 * this functtion is for saving Listing
 */
export const saveListing = catchAsync(async (req, res, next) => {
  const data: Listing = req.body as Listing;
  const alreadyExist = await ListingModel.findOne({ _id: data._id });
  if (alreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }
  const response = await listingService.saveListing(data);
  res.status(httpStatus.CREATED).json({
    data: response
  });
});


/**
 * this functtion is for saving listing in bulk
 */
export const saveBulkListing = catchAsync(async (req, res, next) => {
  const bulkData = req.body.data as Listing[];
  const alreadyExist = await ListingModel.find({
    loanNo: { $in: bulkData.map(data => data._id) }
  });

  if (alreadyExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }

  const response = await listingService.saveListings(
    bulkData
  );

  res.status(httpStatus.CREATED).json({
    data: response
  });
});



