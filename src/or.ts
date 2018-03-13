import { TemporalExpression, BoundedRanges } from './temporalexpression'
import { union, unionReducer } from './operations'
import { DateRange } from 'moment-range'
import { List } from 'immutable'

export class Or extends TemporalExpression {
  readonly lhs: TemporalExpression
  readonly rhs: TemporalExpression

  constructor(lhs: TemporalExpression, rhs: TemporalExpression) {
    super()
    this.lhs = lhs
    this.rhs = rhs
  }

  concrete(bound: DateRange): BoundedRanges {
    const sorted = this.lhs
      .concrete(bound)
      .concat(this.rhs.concrete(bound))
      .sortBy(range => range.start)

    return sorted.reduce(unionReducer, List.of())
  }
}
