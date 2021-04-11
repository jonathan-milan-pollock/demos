import { Validator } from './validator';

export class KeywordsValidator implements Validator {
  isValid = () => true;
}
    
    /*
     bool IsValid(IEnumerable<string> keywords)
            {
                return keywords.Any(); //TODO: Add keywords unique
            }
     **/
}