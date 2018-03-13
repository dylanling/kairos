import { List } from 'immutable'
import { DateRange } from 'moment-range'

export type BoundedRanges = List<DateRange>

export abstract class TemporalExpression {
  abstract concrete(bound: DateRange): BoundedRanges
}
