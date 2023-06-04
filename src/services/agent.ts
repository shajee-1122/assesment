import { Agent as AgentModel } from '../models/agent';
import {Listing as ListingModel } from '../models/listing';
import { Agent } from '../types/types';

class AgentService {

  saveAgent = async (body: Agent) => {
    return AgentModel.create(body);
  };

  saveAgents = (data: Agent[]) => AgentModel.insertMany(data);

  getAgent = (id: string) =>
    AgentModel.findById(id);

  getAgents = (organisationID: string) => ListingModel.aggregate([
        {
        '$match': {
          'organisation': organisationID,
        }
      },
      {
        '$lookup' : {
            'from' : 'agents',
            'localField' : 'ObjectId(_id)',
            'foreignField' : 'agent',
            'as' : 'agents'
        }
      },
      {
        '$replaceRoot': { 'newRoot': { '$mergeObjects': [ { '$arrayElemAt': [ "$agents", 0 ] }, "$ROOT" ] } }
      }
    ]);
}

export default new AgentService();
