import { during } from '../../src/expressions/expressions'
import { Recurring } from '../../src/expressions/recurring'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'
import { DateRange } from 'moment-range'
import { weekly } from '../../src/expressions/recurrence'
import { monthOf } from './helper'

describe('Recurring', () => {
  it('returns recurring weekly', () => {
    const march = monthOf(2018, 3)
    const marchFirstTwoToThreePM = during(
      new DateRange(
        new Date(Date.UTC(2018, 2, 1, 14, 0, 0)),
        new Date(Date.UTC(2018, 2, 1, 15, 0, 0))
      )
    )

    const expression = new Recurring(weekly, marchFirstTwoToThreePM)

    const ranges = expression.ranges(march)

    console.log(ranges)
    // const expected = List.of(
    //   monthRange(2018, 1, 2018, 3),
    //   monthRange(2018, 5, 2018, 12)
    // )

    // expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
