import { _2018, monthsOfYear } from './helper'
import { during, or, except } from '../../src/kairos'
import { List } from 'immutable'
import { rangesEqual, empty } from '../../src/expressions/ranges'
import { TemporalExpression } from '../../src/expressions/expression'

describe('Difference', () => {
  const months = monthsOfYear(2018)

  it('returns the difference when the right is inside the left', () => {
    const marchAprilMay = or(
      during(months.get('march')),
      or(during(months.get('april')), during(months.get('may')))
    )
    const april = during(months.get('april'))

    const expression = except(marchAprilMay, april)

    const ranges = expression.ranges(_2018)
    const expected = or(
      during(months.get('march')),
      during(months.get('may'))
    ).ranges(_2018)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the difference when the left overlaps the right', () => {
    const aprilMay = or(during(months.get('april')), during(months.get('may')))
    const mayJune = or(during(months.get('may')), during(months.get('june')))

    const expression = except(aprilMay, mayJune)

    const ranges = expression.ranges(_2018)
    const expected = List.of(months.get('april'))

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the empty set when the left is inside the right', () => {
    const april = during(months.get('april'))
    const marchAprilMay = or(
      during(months.get('march')),
      or(during(months.get('april')), during(months.get('may')))
    )

    const expression = except(april, marchAprilMay)

    const ranges = expression.ranges(_2018)

    expect(rangesEqual(ranges, empty)).toBeTruthy()
  })
})
