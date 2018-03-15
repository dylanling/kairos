import { TemporalExpression } from './expression'
import { DateRange } from 'moment-range'
import { intersection } from './ranges'
import { List } from 'immutable'

export class Range extends TemporalExpression {
  readonly range: DateRange

  constructor(range: DateRange) {
    super()
    this.range = range
  }

  ranges(reference: DateRange): List<DateRange> {
    return intersection(this.range, reference)
  }

  dateRange(): DateRange {
    return this.range
  }
}
