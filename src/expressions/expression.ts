import { Moment } from 'moment'
import { DateRange } from 'moment-range'
import { List } from 'immutable'

export abstract class TemporalExpression {
  abstract ranges(reference: DateRange): List<DateRange>
}
