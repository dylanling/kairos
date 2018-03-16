import { Duration } from './duration'
import { Moment } from 'moment'
import { Range } from './range'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { TemporalExpression } from './expression'
import { duration } from './expressions'

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
    // TODO: this
    return List.of()
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
