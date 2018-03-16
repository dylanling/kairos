import { DateRange } from 'moment-range'
import { Range } from './range'
import { Union } from './union'
import { TemporalExpression } from './expression'
import { Intersection } from './intersection'
import { Difference } from './difference'
import { Complement } from './complement'
import { Recurrence } from './recurrence'
import { Recurring } from './recurring'

export const during = (duration: DateRange) => new Range(duration)

export const or = (left: TemporalExpression, right: TemporalExpression) =>
  new Union(left, right)

export const and = (left: TemporalExpression, right: TemporalExpression) =>
  new Intersection(left, right)

export const except = (left: TemporalExpression, right: TemporalExpression) =>
  new Difference(left, right)

export const not = (expression: TemporalExpression) =>
  new Complement(expression)

export const recurring = (recurrence: Recurrence, firstRange: Range) =>
  new Recurring(recurrence, firstRange)

/*

class RangeStart {
    start: Moment

    constructor(start: Moment) {
        this.start = start
    }

    until(end: Moment): Range {
        return new Range(new DateRange(this.start, end))
    }
}


export const from = (start: Moment) => new RangeStart(start)

// these all have final arguments of ranges WITHIN A SINGLE DAY/DATE

every(day, from(noon).until(midnight)) // time range is enough info when every day

every(week.on(tuesday), from(noon).until(midnight)) // time range not enough info when every week

every(month.onThe(27), from(noon).until(midnight))

day, week.on(tuesday), month.onThe(27) all return a recurrence? also they all return day granularity


// another idea

every(5, days, from(noon).until(midnight)).startingOn(someMomentWithDayGranularity?)

every(3, minutes, ???)

// every x somethings has no reference meaning, how to do bounds?


// what about
every(someRange).forADurationOf(someLengthWithoutConcreteStartAndEnd).startingOn(aMoment)

// or

every(someRange, forADurationOf(someLengthWithoutConcreteStartAndEnd), startingOn(aMoment))

// just need to check duration is shorting than someRange (also just a length/moment range)

*/



