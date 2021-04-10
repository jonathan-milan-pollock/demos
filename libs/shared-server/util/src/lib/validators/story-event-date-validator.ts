import { Validator } from './validator';

export class StoryEventDateValidator implements Validator {
  isValid = () => true;
}

/*
    private readonly DateTime today;

StoryEventDateValidator(DateTime today)
    {
        this.today = today;
    }

    bool IsValid(Story story)
    {
        return today >= new DateTime(story.EventDate.Year, story.EventDate.Month, story.EventDate.Day);
    }
    **/
