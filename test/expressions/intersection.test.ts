import { monthOf, _2018, monthRange, monthsOfYear } from './helper'
import { and, during, or } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual, empty } from '../../src/expressions/ranges'
import { TemporalExpression } from '../../src/expressions/expression'

describe('Intersection', () => {
  const months = monthsOfYear(2018)

  it('returns the empty set for the intersection of two distinct ranges', () => {
    const expression = and(
      during(months.get('april')),
      during(months.get('july'))
    )
    const ranges = expression.ranges(_2018)

    expect(rangesEqual(ranges, empty)).toBeTruthy()
  })

  it('returns the empty set for the intersection of two adjacent ranges', () => {
    const expression = and(
      during(months.get('april')),
      during(months.get('may'))
    )
    const ranges = expression.ranges(_2018)

    expect(rangesEqual(ranges, empty)).toBeTruthy()
  })

  it('returns the intersection of two overlapping ranges', () => {
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)

    const expression = and(during(aprilAndMay), during(mayAndJune))

    const ranges = expression.ranges(_2018)
    const expected = List.of(monthOf(2018, 5))

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the intersection of two overlapping ranges, each of multiple disjoint sets', () => {
    const aprilMay = or(during(months.get('april')), during(months.get('may')))
    const julyAugust = or(
      during(months.get('july')),
      during(months.get('august'))
    )
    const octoberNovember = or(
      during(months.get('october')),
      during(months.get('november'))
    )

    const mayJune = or(during(months.get('may')), during(months.get('june')))
    const augustSeptember = or(
      during(months.get('august')),
      during(months.get('september'))
    )
    const novemberDecember = or(
      during(months.get('november')),
      during(months.get('december'))
    )

    const left = or(aprilMay, or(julyAugust, octoberNovember))
    const right = or(or(mayJune, augustSeptember), novemberDecember)

    const expression = and(left, right)

    const ranges = expression.ranges(_2018)
    const expected = List.of('may', 'august', 'november').map(month =>
      months.get(month)
    )

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
