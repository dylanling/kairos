import { during } from '../../src/expressions/expressions'
import { Recurring } from '../../src/expressions/recurring'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'
import { weekly } from '../../src/expressions/recurrence'
import { monthOf } from './helper'

describe('Recurring', () => {
  it('returns recurring weekly', () => {
    const twoToThreePMOnMarch = (date: number) =>
      during(
        new DateRange(
          new Date(Date.UTC(2018, 2, date, 14, 0, 0)),
          new Date(Date.UTC(2018, 2, date, 15, 0, 0))
        )
      )
    const march = monthOf(2018, 3)

    const expression = new Recurring(weekly, twoToThreePMOnMarch(1))

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
