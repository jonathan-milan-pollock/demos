import { Validator } from './validator';

export class LocationValidator implements Validator {
  isValid = () => true;
}
    
    /*
     bool IsValid(Location location)
           {
               return (location.Place.IsSome ||
                       location.City.IsSome ||
                       location.StateOrProvince.IsSome) &&
                      location.Country.IsSome;
           }
     **/
}
