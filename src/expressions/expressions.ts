import { DateRange } from 'moment-range'
import { Range } from './range'
import { Union } from './union'
import { TemporalExpression } from './expression'
import { Intersection } from './intersection'
import { Difference } from './difference'
import { Complement } from './complement'

export const during = (duration: DateRange) => new Range(duration)

export const or = (left: TemporalExpression, right: TemporalExpression) =>
  new Union(left, right) // Union.of()?

export const and = (left: TemporalExpression, right: TemporalExpression) =>
  new Intersection(left, right)

export const except = (left: TemporalExpression, right: TemporalExpression) =>
  new Difference(left, right)

export const not = (expression: TemporalExpression) =>
  new Complement(expression)
