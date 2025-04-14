import { MONTHS } from "./utils";
// types/UserJourney.ts
export class JourneyStep {
  public timestamp: number;
  public pageUrl: string;
  public action: string;
  public location?: string;
  public elementId?: string;
  public additionalData?: Record<string, any>;

  constructor(pageUrl: string, action: string, elementId?: string, additionalData?: Record<string, any>) {
    this.timestamp = Date.now();
    this.pageUrl = pageUrl;
    this.action = action;
    this.elementId = elementId;
    this.additionalData = additionalData;
  }

};

export class UserJourney {

  public sessionId: number;
  public steps: JourneyStep[];
  public startTime: Date;
  public city: string;
  public country: string;
  [key: string]: any;

  constructor(sessionId: number, steps: JourneyStep[] = [], city: string, country: string, startTime?: Date) {
    this.sessionId = sessionId;
    this.steps = steps;
    this.startTime = startTime || new Date();
    this.city = city;
    this.country = country;
  }

  public addStep(journeyStep: JourneyStep) {
    this.steps.push(journeyStep);
  }

  public getNumberOfSteps() {
    return this.steps.length;
  }

  public numberOfLinksClicked() {
    return this.steps.filter(step => step.action === 'link_click').length;
  }

  public didFormSubmit() {
    return this.steps.some(step => step.action === 'form_submit');
  }

  public didFormInteract() {
    return this.steps.some(step => step.action === 'form_interaction');
  }

  public static getAverageJourneyLength(journeys: UserJourney[]) {
    if (journeys.length === 0) return 0;
    return journeys.reduce((acc, journey) => acc + journey.getNumberOfSteps(), 0) / journeys.length;
  }

  public static getTotalJourneysByMonth(journeys: UserJourney[], month: number, year: number) {
    return journeys.filter(journey => journey.startTime.getMonth() === month && journey.startTime.getFullYear() === year).length;
  }

  public static getTotalJourneysByDay(journeys: UserJourney[], d: Date) {
    return journeys.filter(j => {
      const journeyDate = j.startTime;
      return journeyDate.getDate() === d.getDate() &&
        journeyDate.getMonth() === d.getMonth() &&
        journeyDate.getFullYear() === d.getFullYear();
    }).length;
  }

  public static getLongestJourney(journeys: UserJourney[]) {
    if (journeys.length === 0) return null;
    return journeys.reduce((longest, current) => {
      return current.getNumberOfSteps() > longest.getNumberOfSteps() ? current : longest;
    });
  }

  public static getLongestJourneyByTime(journeys: UserJourney[]) {
    if (journeys.length === 0) return null;
    return journeys.reduce((longest, current) => {
      return current.startTime.getTime() > longest.startTime.getTime() ? current : longest;
    });
  }

  public static getBusiestDay(journeys: UserJourney[]) {
    if (journeys.length === 0) return null;
    const days = journeys.reduce((acc, journey) => {
      const date = journey.startTime.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const busiestDay = Object.keys(days).reduce((busiest, current) => {
      return days[current] > days[busiest] ? current : busiest;
    });

    return busiestDay;
  }

  public static formConversionRate(journeys: UserJourney[]) {
    const formJourneys = journeys.filter(j => j.didFormSubmit());
    return formJourneys.length === 0 ? 0 : (100 * (formJourneys.length / journeys.length));
  }

  public static dailyConversionRate(journeys: UserJourney[], day: number, month: number, year: number) {
    const thisDayJourneys = journeys.filter(j => j.startTime.getDate() === day && j.startTime.getMonth() === month && j.startTime.getFullYear() === year);
    const conversions = journeys.filter(j => j.didFormSubmit());
    return conversions.length === 0 ? 0 : (100 * (conversions.length / thisDayJourneys.length));
  }

  public static monthlyConversionRate(journeys: UserJourney[], month: number, year: number) {
    const thisMonthJourneys = journeys.filter(j => j.startTime.getMonth() === month && j.startTime.getFullYear() === year);
    const conversions = journeys.filter(j => j.didFormSubmit());
    console.log(journeys.map(j => j.startTime.getMonth()), "TotalJourneys");
    console.log(thisMonthJourneys.map(j => j.startTime.getMonth()), "MonthJourneys " + MONTHS[month]);
    return conversions.length === 0 ? 0 : (100 * (conversions.length / thisMonthJourneys.length));
  }


  public log() {
    console.log('Logging user journey:', this);
  }

}



