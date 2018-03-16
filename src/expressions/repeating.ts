import { Duration } from './duration'
import { Moment } from 'moment'
import { Range } from './range'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { TemporalExpression } from './expression'
import { duration, during } from './expressions'
import { Recurring } from './recurring'

export class Repeating extends TemporalExpression {
  readonly every: Duration
  readonly duration: Duration
  readonly start: Moment

  constructor(every: Duration, duration: Duration, start: Moment) {
    super()
    this.every = every
    this.duration = duration
    this.start = start
  }

  ranges(reference: DateRange): List<DateRange> {
    const firstRange = during(
      new DateRange(
        this.start.clone(),
        this.start.clone().add(this.duration.ms, 'ms')
      )
    )
    const recurring = new Recurring(
      (from: Moment) => from.add(this.every.ms, 'ms'),
      firstRange
    )
    return recurring.ranges(reference)
  }
}

export class Every {
  readonly every: Duration

  constructor(every: Duration) {
    this.every = every
  }

  for(value: number, unit: string): RepeatingWithDuration {
    return new RepeatingWithDuration(this.every, duration(value, unit))
  }

  startingAt(start: Moment) {
    return new RepeatingWithStart(this.every, start)
  }
}

export class RepeatingWithDuration {
  readonly every: Duration
  readonly duration: Duration

  constructor(every: Duration, duration: Duration) {
    this.every = every
    this.duration = duration
  }

  startingAt(start: Moment): Repeating {
    return new Repeating(this.every, this.duration, start)
  }
}

export class RepeatingWithStart {
  readonly every: Duration
  readonly start: Moment

  constructor(every: Duration, start: Moment) {
    this.every = every
    this.start = start
  }

  for(value: number, unit: string): Repeating {
    return new Repeating(this.every, duration(value, unit), this.start)
  }
}
