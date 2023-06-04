import httpStatus from 'http-status';
import {
  RECORD_ALREADY_EXIST,
} from '../constants/constants';
import { catchAsync } from '../utils/catchAsync';
import organisationService from '../services/organisation';
import { Organisation } from '../types/types';
import { ApiError } from '../utils/ApiError';
import { Organisation as OrganisationModel } from '../models/organisation';


/**
 * this functtion is to get only one organisation
 */
export const getOrganisation = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const organisation: Organisation | null =
    await organisationService.getOrganisation(id);

  res.status(httpStatus.OK).json({
    data: organisation
  });
});



/**
 * this functtion fetches the list of organisations
 */
export const getOrganisations = catchAsync(async (req, res, next) => {
  const organisations: Organisation[] = await organisationService.getOrganisations();
  res.status(httpStatus.OK).json({
    data: organisations
  });
});



/**
 * this functtion is used to save the mortgage loan
 */
export const saveOrganisation = catchAsync(async (req, res, next) => {
  const data: Organisation = req.body as Organisation;
  const alreadyExist = await OrganisationModel.findOne({ loanNo: data._id });
  if (alreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }
  const response = await organisationService.saveOrganisation(data);
  res.status(httpStatus.CREATED).json({
    data: response
  });
});


/**
 * this functtion is used to save the mortgage loan in bulk
 */
export const saveOrganisations = catchAsync(async (req, res, next) => {
  const bulkData = req.body.data as Organisation[];
  const alreadyExist = await OrganisationModel.find({
    _id: { $in: bulkData.map(data => data._id) }
  });

  if (alreadyExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }

  const response = await organisationService.saveOrganisations(
    bulkData
  );

  res.status(httpStatus.CREATED).json({
    data: response
  });
});



