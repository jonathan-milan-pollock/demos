//

/*
 
 public static string Format(this Location location)
         {
             var stringBuilder = new stringBuilder();

             location.Place.Match(place =>
             {
                 stringBuilder.Append(
                     stringBuilder.Length > 0 ? $"{place}" : place);
             }, () => { });

             location.City.Match(city =>
             {
                 stringBuilder.Append(
                     stringBuilder.Length > 0 ? $", {city}" : city);
             }, () => { });

             location.StateOrProvince.Match(stateOrProvince =>
             {
                 stringBuilder.Append(
                     stringBuilder.Length > 0 ? $", {stateOrProvince}" : stateOrProvince);
             }, () => { });

             //TODO: Test that filter works!
             location.Country
                 .Filter(country => !country.Equals("United States", stringComparison.InvariantCultureIgnoreCase))
                 .Match(country =>
                     {
                         stringBuilder.Append(
                             stringBuilder.Length > 0 ? $", {country}" : country);
                     },
                     () => { });

             return stringBuilder.Tostring();
         }
 **/
