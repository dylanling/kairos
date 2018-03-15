import { DateRange } from 'moment-range'
import { during, or, and, except, recurring } from './expressions/expressions'
import { TemporalExpression } from './expressions/expression'
import { weekly } from './expressions/recurrence'

class Example {
  basicExample() {
    // [2007-02-09 00:00:00:000, 2007-02-10 00:00:00:000]
    let example: TemporalExpression = during(februaryNinth2007)
  }

  unionExample() {
    // [2018-01-01 00:00:00:000, 2020-01-01 00:00:00:000]
    let example: TemporalExpression = or(during(_2018), during(_2019))

    // Infix notation
    example = during(_2018).or(during(_2019))
  }

  intersectionExample() {
    const marchApril: TemporalExpression = or(during(march), during(april))
    const aprilMay: TemporalExpression = or(during(april), during(may))

    // [2018-04-01 00:00:00:000, 2018-05-01 00:00:00:000]
    let example: TemporalExpression = and(marchApril, aprilMay)

    // Infix notation
    example = marchApril.and(aprilMay)
  }

  setDifferenceExample() {
    // [[2018-01-01 00:00:00:000, 2018-04-01 00:00:00:000], [2018-05-01 00:00:00:000, 2019-01-01 00:00:00:000]]
    let example: TemporalExpression = except(during(_2018), during(april))

    // Infix notation
    example = during(_2018).except(during(april))
  }

  recurringFixedIntervalExample() {
    // [[2018-03-01 14:00:00:000, 2018-03-01 15:00:00:000], [2018-03-08 14:00:00:000, 2018-03-08 15:00:00:000], ...]
    let example: TemporalExpression = recurring(weekly, twoToThreePMOnMarch1st)
  }
}

const februaryNinth2007 = new DateRange(
  new Date('2007-02-09'),
  new Date('2007-02-10')
)

const _2018 = new DateRange(new Date('2018-01-01'), new Date('2019-01-01'))
const _2019 = new DateRange(new Date('2019-01-01'), new Date('2020-01-01'))

const march = new DateRange(new Date('2018-03-01'), new Date('2018-04-01'))
const april = new DateRange(new Date('2018-04-01'), new Date('2018-05-01'))
const may = new DateRange(new Date('2018-05-01'), new Date('2018-06-01'))

const twoToThreePMOnMarch1st = during(
  new DateRange(
    new Date(Date.UTC(2018, 2, 1, 14, 0, 0)),
    new Date(Date.UTC(2018, 2, 1, 15, 0, 0))
  )
)
