import { during, recurring, at } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'
import { weekly, monthlyOnThe } from '../../src/expressions/recurrence'
import { monthOf, _2018 } from './helper'
import { Moment } from 'moment'

describe('Recurring', () => {
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

  it('returns recurring on the 14th of the month', () => {
    const expression = recurring(monthlyOnThe(14), twoToThreePMOnMarch(14))
    const ranges = expression.ranges(_2018)

    const expected = List.of(
      twoToThreePMOn(3, 14).dateRange(),
      twoToThreePMOn(4, 14).dateRange(),
      twoToThreePMOn(5, 14).dateRange(),
      twoToThreePMOn(6, 14).dateRange(),
      twoToThreePMOn(7, 14).dateRange(),
      twoToThreePMOn(8, 14).dateRange(),
      twoToThreePMOn(9, 14).dateRange(),
      twoToThreePMOn(10, 14).dateRange(),
      twoToThreePMOn(11, 14).dateRange(),
      twoToThreePMOn(12, 14).dateRange()
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('throws an error for monthly expressions with large dates', () => {
    const expression = () => monthlyOnThe(29)(at(new Date()))
    expect(expression).toThrowError(RangeError)
  })
})
