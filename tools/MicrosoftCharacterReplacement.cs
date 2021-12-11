using System;
using Models;

namespace Domain.Website
{
    public interface IMicrosoftCharacterReplacementDomain
    {
        void VerifySanitized(string microsoftString);
    }

    public class MicrosoftCharacterReplacementDomain : IMicrosoftCharacterReplacementDomain
    {
        public void VerifySanitized(string microsoftString)
        {
            if (string.IsNullOrEmpty(microsoftString))
                throw new ArgumentNullException(nameof(microsoftString));

            string validationMessage = null;
            if (microsoftString.Contains("\u2013", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an - en dash";

            else if (microsoftString.Contains("\u2014", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an  - em dash";

            else if (microsoftString.Contains("\u2015", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an - horizontal bar";

            else if (microsoftString.Contains("\u2017", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an _ double low line";

            else if (microsoftString.Contains("\u2018", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an ' left single quotation mark";

            else if (microsoftString.Contains("\u2019", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an ' right single quotation mark";

            else if (microsoftString.Contains("\u201b", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an ' single low-9 quotation mark";

            else if (microsoftString.Contains("\u201c", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an ' single high-reversed-9 quotation mark";

            else if (microsoftString.Contains("\u201d", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an \" left double quotation mark";

            else if (microsoftString.Contains("\u201e", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an \" right double quotation mark";

            else if (microsoftString.Contains("\u2026", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an ... horizontal ellipsis";

            else if (microsoftString.Contains("\u2032", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an '  prime";

            else if (microsoftString.Contains("\u2033", StringComparison.InvariantCulture))
                validationMessage = "Microsoft String contains an '' double prime";

            if (validationMessage != null)
                throw new DarkRushPhotographyException(validationMessage);
        }
    }
}
