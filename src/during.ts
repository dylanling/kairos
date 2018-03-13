import { TemporalExpression, BoundedRanges } from './temporalexpression'
import { DateRange } from 'moment-range'
import { intersection } from './operations'

export class During extends TemporalExpression {
  readonly duration: DateRange

  constructor(duration: DateRange) {
    super()
    this.duration = duration
  }

  concrete(bound: DateRange): BoundedRanges {
    return intersection(this.duration, bound)
  }
}
