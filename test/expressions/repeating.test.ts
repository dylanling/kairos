import { monthOf } from './helper'
import { every, at, during } from '../../src/kairos'
import { List } from 'immutable'
import { rangesEqual, dateRangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'

describe('Repeating', () => {
  const twoToThreePMOnApril = (date: number) => twoToThreePMOn(4, date)

  const twoToThreePMOn = (month: number, date: number) =>
    during(
      new DateRange(
        new Date(Date.UTC(2018, month - 1, date, 14, 0, 0)),
        new Date(Date.UTC(2018, month - 1, date, 15, 0, 0))
      )
    )

  const april = monthOf(2018, 4)
  const april1stAt2pm = at(new Date(Date.UTC(2018, 3, 1, 14, 0, 0)))

  it('returns recurring weekly', () => {
    const expression = every(1, 'week')
      .for(1, 'hour')
      .startingAt(april1stAt2pm)
    const ranges = expression.ranges(april)

    const expected = List.of(
      twoToThreePMOnApril(1).dateRange(),
      twoToThreePMOnApril(8).dateRange(),
      twoToThreePMOnApril(15).dateRange(),
      twoToThreePMOnApril(22).dateRange(),
      twoToThreePMOnApril(29).dateRange()
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns recurring daily', () => {
    const expression = every(1, 'day')
      .startingAt(april1stAt2pm)
      .for(1, 'hour')

    const ranges = expression.ranges(april)
    const expected: List<DateRange> = List.of().concat(
      Array.apply(null, Array(30))
        .map((_, index) => index + 1)
        .map(date => twoToThreePMOnApril(date).dateRange())
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
