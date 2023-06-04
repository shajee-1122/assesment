import { Organisation as OrganisationModel } from '../models/organisation';
import { Organisation } from '../types/types';

class OrganisationService {
  
  saveOrganisation = async (body: Organisation) => {
    return OrganisationModel.create(body);
  };

  saveOrganisations = (data: Organisation[]) => OrganisationModel.insertMany(data);

  getOrganisation = (id: string) =>
    OrganisationModel.findOne(
      {
        _id: id
      },
    );

  getOrganisations = () => OrganisationModel.find({}, { _id: 0 });
}

export default new OrganisationService();
