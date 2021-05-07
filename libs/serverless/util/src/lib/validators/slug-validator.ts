import { Validator } from './validator';

export class SlugValidator implements Validator {
  isValid = () => true;
}

/*
 private static readonly Regex regex = new("^[A-Z]*|[a-z]*|-+$"); //alphanumeric characters or -

        bool IsValid(string slug)
        {
            return regex.IsMatch(slug);
        }
 **/
