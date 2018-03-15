import { TemporalExpression } from './expression'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { empty } from './ranges'

export class Difference extends TemporalExpression {
  readonly left: TemporalExpression
  readonly right: TemporalExpression

  constructor(left: TemporalExpression, right: TemporalExpression) {
    super()
    this.left = left
    this.right = right
  }

  ranges(reference: DateRange): List<DateRange> {
    const lhs = this.left.ranges(reference)
    const rhs = this.right.ranges(reference)

    return List.of()
  }
}
