import { during } from '../src/expressions'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { boundedRangesEqual } from '../src/operations'
import { BoundedRanges } from '../src/temporalexpression'
import { monthOf, monthRange, _2018 } from './utils'

describe('During', () => {
  it('returns the duration when duration falls within bound', () => {
    const april = monthOf(2018, 4)
    const expression = during(april)

    const concrete = expression.concrete(_2018)
    const expected = List.of(april)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('cuts off ranges at bound when duration and bound overlap', () => {
    const january = monthOf(2018, 1)

    const decemberAndJanuary = monthRange(2017, 12, 2018, 1)
    const expression = during(decemberAndJanuary)

    const concrete = expression.concrete(_2018)
    const expected = List.of(january)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns empty list when duration and bound do not overlap', () => {
    const january2019 = monthOf(2019, 1)

    const expression = during(january2019)

    const concrete = expression.concrete(_2018)
    const expected: BoundedRanges = List.of()

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })
})
