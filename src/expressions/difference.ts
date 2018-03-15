import { TemporalExpression } from './expression'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { empty, mergeUsing } from './ranges'

export class Difference extends TemporalExpression {
  readonly left: TemporalExpression
  readonly right: TemporalExpression

  constructor(left: TemporalExpression, right: TemporalExpression) {
    super()
    this.left = left
    this.right = right
  }

  ranges(reference: DateRange): List<DateRange> {
    return mergeUsing(
      (inLeft, inRight) => inLeft && !inRight,
      this.left.ranges(reference),
      this.right.ranges(reference)
    )
  }
}
