import { TemporalExpression } from './expression'
import { DateRange } from 'moment-range'
import { List } from 'immutable'
import { mergeUsing } from './ranges'

export class Intersection extends TemporalExpression {
  readonly left: TemporalExpression
  readonly right: TemporalExpression

  constructor(left: TemporalExpression, right: TemporalExpression) {
    super()
    this.left = left
    this.right = right
  }

  ranges(reference: DateRange): List<DateRange> {
    return mergeUsing(
      (a, b) => a || b,
      this.left.ranges(reference),
      this.right.ranges(reference)
    )
  }
}
