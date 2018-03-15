import { TemporalExpression } from './expression'
import { DateRange } from 'moment-range'
import { List } from 'immutable'
import { and, during } from './expressions'

export class Complement extends TemporalExpression {
  readonly expression: TemporalExpression

  constructor(expression: TemporalExpression) {
    super()
    this.expression = expression
  }

  ranges(reference: DateRange): List<DateRange> {
    return List.of()
  }
}
