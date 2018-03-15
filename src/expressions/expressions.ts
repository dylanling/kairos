import { DateRange } from 'moment-range'
import { Range } from './range'
import { Union } from './union'
import { TemporalExpression } from './expression'
import { Intersection } from './intersection'

export const during = (duration: DateRange) => new Range(duration)

export const or = (left: TemporalExpression, right: TemporalExpression) =>
  new Union(left, right)

export const and = (left: TemporalExpression, right: TemporalExpression) =>
  new Intersection(left, right)
