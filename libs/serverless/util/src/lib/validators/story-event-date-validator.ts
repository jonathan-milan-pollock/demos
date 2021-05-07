import { Validator } from './validator';

export class EventDateValidator implements Validator {
  isValid = () => true;
}

/*
    private readonly DateTime today;

    EventDateValidator(DateTime today)
    {
        this.today = today;
    }

    bool IsValid(Event event)
    {
        return today >= new DateTime(event.EventDate.Year, event.EventDate.Month, event.EventDate.Day);
    }
    **/
