import httpStatus from 'http-status';
import {
  INVALID_QUERY_PARAM,
  RECORD_ALREADY_EXIST,
  RECORD_NOT_FOUND
} from '../constants/constants';
import { catchAsync } from '../utils/catchAsync';
import agentService from '../services/agent';
import { Agent } from '../types/types';
import { ApiError } from '../utils/ApiError';
import { Agent as AgentModel } from '../models/agent';


/**
 * this functtion gets only a single agent
 * @param agentID query param
 * @returns {object} The requested agents
 */
export const getAgent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const agent: Agent | null =
    await agentService.getAgent(id);

  res.status(httpStatus.OK).json({
    data: agent
  });
});


/**
 * this functtion gets the list of agents with query string 
 * @param {string} organisationID query string
 * @returns {array} The requested agents
 */
export const getAgents = catchAsync(async (req, res) => {
  if(!req.query.hasOwnProperty("organisationID")) {
    //sending bad request due to missing query params 
    throw new ApiError(httpStatus.BAD_REQUEST, INVALID_QUERY_PARAM);
  }
  const data: Agent[] = await agentService.getAgents(String(req.query.organisationID));
  res.status(httpStatus.OK).json({
    data: data
  });
});

/**
 * this functtion is for saving agent
 */
export const saveAgent = catchAsync(async (req, res) => {
  const data: Agent = req.body as Agent;
  const alreadyExist = await AgentModel.findOne({ _id: data._id });
  if (alreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }
  const response = await agentService.saveAgent(data);
  res.status(httpStatus.CREATED).json({
    data: response
  });
});

/**
 * this functtion is for saving agents in bulk
 */
export const saveAgents = catchAsync(async (req, res) => {
  const bulkData = req.body.data as Agent[];
  const alreadyExist = await AgentModel.find({
    _id: { $in: bulkData.map(data => data._id) }
  });

  if (alreadyExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECORD_ALREADY_EXIST);
  }
  const response = await agentService.saveAgents(
    bulkData
  );
  res.status(httpStatus.CREATED).json({
    data: response
  });
});



