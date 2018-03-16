import { Moment } from 'moment'
import { DateRange } from 'moment-range'
import { List } from 'immutable'
import { and, or, except } from './expressions'

export abstract class TemporalExpression {
  abstract ranges(reference: DateRange): List<DateRange>

  and(expression: TemporalExpression): TemporalExpression {
    return and(this, expression)
  }

  or(expression: TemporalExpression): TemporalExpression {
    return or(this, expression)
  }

  also(expression: TemporalExpression): TemporalExpression {
    return this.or(expression)
  }

  except(expression: TemporalExpression): TemporalExpression {
    return except(this, expression)
  }
}
