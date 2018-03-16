import { DateRange } from 'moment-range'
import { Range } from './range'
import { Union } from './union'
import { TemporalExpression } from './expression'
import { Intersection } from './intersection'
import { Difference } from './difference'
import { Complement } from './complement'
import { Recurrence } from './recurrence'
import { Recurring } from './recurring'
import { Duration } from './duration'
import { Every, Repeating } from './repeating'
import { Moment } from 'moment'

const moment = require('moment')

export const at = (date: Date): Moment => moment(date)

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
