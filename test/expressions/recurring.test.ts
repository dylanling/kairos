import { during, recurring } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'
import { weekly, monthlyOnThe } from '../../src/expressions/recurrence'
import { monthOf, _2018 } from './helper'
import { Moment } from 'moment'

describe('Recurring', () => {
  const twoToThreePMOnMarch = (date: number) =>
    during(
      new DateRange(
        new Date(Date.UTC(2018, 2, date, 14, 0, 0)),
        new Date(Date.UTC(2018, 2, date, 15, 0, 0))
      )
    )

  it('returns recurring weekly', () => {
    const march = monthOf(2018, 3)

    const expression = recurring(weekly, twoToThreePMOnMarch(1))

    const ranges = expression.ranges(march)

    const expected = List.of(
      twoToThreePMOnMarch(1).dateRange(),
      twoToThreePMOnMarch(8).dateRange(),
      twoToThreePMOnMarch(15).dateRange(),
      twoToThreePMOnMarch(22).dateRange(),
      twoToThreePMOnMarch(29).dateRange()
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
