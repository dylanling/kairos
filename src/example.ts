import { at, during } from './kairos'
import { Moment } from 'moment'
import { TemporalExpression } from './expressions/expression'
import { DateRange } from 'moment-range'

let midnightFebruaryNinth2007: Moment = at(new Date('2007-02-09'))
let midnightFebruaryTenth2007: Moment = at(new Date('2007-02-10'))

let durationOfFebruaryNinth: TemporalExpression = during(
  new DateRange(midnightFebruaryNinth2007, midnightFebruaryTenth2007)
)
