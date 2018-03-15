import { monthOf, _2018, monthRange, monthsOfYear } from './helper'
import { and, during, or, except } from '../../src/expressions/expressions'
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
})
