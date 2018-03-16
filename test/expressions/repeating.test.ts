import { monthOf } from './helper'
import { every, at, during } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'

describe('Repeating', () => {
  const twoToThreePMOnMarch = (date: number) => twoToThreePMOn(3, date)

  const twoToThreePMOn = (month: number, date: number) =>
    during(
      new DateRange(
        new Date(Date.UTC(2018, month - 1, date, 14, 0, 0)),
        new Date(Date.UTC(2018, month - 1, date, 15, 0, 0))
      )
    )

  it('returns recurring weekly', () => {
    const march = monthOf(2018, 3)
    const march1stAt2pm = at(new Date(Date.UTC(2018, 2, 1, 14, 0, 0)))
    const expression = every(1, 'week')
      .for(1, 'hour')
      .startingAt(march1stAt2pm)
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
