import { DateRange } from 'moment-range'
import { During } from './during'
import { TemporalExpression } from './temporalexpression'
import { Or } from './or'

export const during = (duration: DateRange) => new During(duration)
export const or = (lhs: TemporalExpression, rhs: TemporalExpression) =>
  new Or(lhs, rhs)
