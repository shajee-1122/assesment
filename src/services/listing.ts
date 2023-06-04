import { Listing as ListingModel } from '../models/listing';
import { Listing } from '../types/types';

class ListingService {
  
  getListings = (filter?: object) =>  ListingModel.find(filter ? filter :{});

  saveListing = async (body: Listing) => {
    return ListingModel.create(body);
  };

  saveListings = (data: Listing[]) => ListingModel.insertMany(data);

  getListing = (id: string) => {
    return ListingModel.findById(id);
  }
  
}

export default new ListingService();
