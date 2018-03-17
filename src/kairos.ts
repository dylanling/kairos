import { DateRange } from 'moment-range'
import { Range } from './expressions/range'
import { Union } from './expressions/union'
import { TemporalExpression } from './expressions/expression'
import { Intersection } from './expressions/intersection'
import { Difference } from './expressions/difference'
import { Complement } from './expressions/complement'
import { Recurrence } from './expressions/recurrence'
import { Recurring } from './expressions/recurring'
import { Duration } from './expressions/duration'
import { Every, Repeating } from './expressions/repeating'
import { Moment } from 'moment'

const moment = require('moment')

export const at = (date: Date): Moment => moment(date)

export const between = (start: Moment, end: Moment) => new DateRange(start, end)

export const during = (duration: DateRange) => new Range(duration)

export const or = (left: TemporalExpression, right: TemporalExpression) =>
  new Union(left, right)

export const and = (left: TemporalExpression, right: TemporalExpression) =>
  new Intersection(left, right)

export const except = (left: TemporalExpression, right: TemporalExpression) =>
  new Difference(left, right)

export const not = (expression: TemporalExpression) =>
  new Complement(expression)

export const recurring = (recurrence: Recurrence, firstRange: Range) =>
  new Recurring(recurrence, firstRange)

export const duration = (length: number, unit: string) =>
  new Duration(moment.duration(length, unit).asMilliseconds())

export const every = (length: number, unit: string) =>
  new Every(duration(length, unit))
