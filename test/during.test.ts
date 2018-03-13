import { During } from '../src/during'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { boundedRangesEqual } from '../src/operations'
import { BoundedRanges } from '../src/temporalexpression'

describe('During', () => {
  const _2018 = new DateRange(new Date('2018-01-01'), new Date('2019-01-01'))

  it('returns the duration when duration falls within bound', () => {
    const april = new DateRange(new Date('2018-04-01'), new Date('2018-05-01'))
    const expression = new During(april)

    const concrete = expression.concrete(_2018)
    const expected = List.of(april)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('cuts off ranges at bound when duration and bound overlap', () => {
    const january = new DateRange(
      new Date('2018-01-01'),
      new Date('2018-02-01')
    )
    const decemberAndJanuary = new DateRange(
      new Date('2017-12-01'),
      new Date('2018-02-01')
    )
    const expression = new During(decemberAndJanuary)

    const concrete = expression.concrete(_2018)
    const expected = List.of(january)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns empty list when duration and bound do not overlap', () => {
    const january2019 = new DateRange(
      new Date('2019-01-01'),
      new Date('2019-02-01')
    )
    const expression = new During(january2019)

    const concrete = expression.concrete(_2018)
    const expected: BoundedRanges = List.of()

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })
})
