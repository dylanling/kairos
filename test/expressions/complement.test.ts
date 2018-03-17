import { _2018, monthsOfYear, monthRange } from './helper'
import { during, not, or } from '../../src/kairos'
import { List } from 'immutable'
import { rangesEqual, empty } from '../../src/expressions/ranges'
import { TemporalExpression } from '../../src/expressions/expression'

describe('Difference', () => {
  const months = monthsOfYear(2018)

  it('returns the complement when the expression is inside the reference', () => {
    const april = during(months.get('april'))
    const expression = not(april)

    const ranges = expression.ranges(_2018)
    const expected = List.of(
      monthRange(2018, 1, 2018, 3),
      monthRange(2018, 5, 2018, 12)
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the empty set when the reference is inside the expression', () => {
    const expression = not(during(_2018))

    const ranges = expression.ranges(months.get('april'))

    expect(rangesEqual(ranges, empty)).toBeTruthy()
  })

  it('returns the complement when the reference overlaps the expression', () => {
    const aprilMay = or(during(months.get('april')), during(months.get('may')))
    const mayJune = monthRange(2018, 5, 2018, 6)

    const expression = not(aprilMay)

    const ranges = expression.ranges(mayJune)
    const expected = List.of(months.get('june'))

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
