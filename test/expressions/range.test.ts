import { monthOf, _2018, monthRange } from './helper'
import { during } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual, empty } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'

describe('During', () => {
  it('returns the duration when duration falls within bound', () => {
    const april = monthOf(2018, 4)
    const expression = during(april)

    const ranges = expression.ranges(_2018)
    const expected = List.of(april)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('cuts off ranges at bound when duration and bound overlap', () => {
    const january = monthOf(2018, 1)

    const decemberAndJanuary = monthRange(2017, 12, 2018, 1)
    const expression = during(decemberAndJanuary)

    const ranges = expression.ranges(_2018)
    const expected = List.of(january)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns empty list when duration and bound do not overlap', () => {
    const january2019 = monthOf(2019, 1)

    const expression = during(january2019)

    const ranges = expression.ranges(_2018)

    expect(rangesEqual(ranges, empty)).toBeTruthy()
  })
})
