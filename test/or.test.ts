import { Or } from '../src/or'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { boundedRangesEqual } from '../src/operations'
import { BoundedRanges } from '../src/temporalexpression'
import { During } from '../src/during'

describe('Or', () => {
  const _2018 = new DateRange(new Date('2018-01-01'), new Date('2019-01-01'))

  it('returns the union of two distinct ranges', () => {
    const april = new DateRange(new Date('2018-04-01'), new Date('2018-05-01'))
    const july = new DateRange(new Date('2018-07-01'), new Date('2018-07-01'))

    const expression = new Or(new During(april), new During(july))

    const concrete = expression.concrete(_2018)
    const expected = List.of(april, july)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of two overlapping ranges', () => {
    const aprilAndMay = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-06-01')
    )
    const mayAndJune = new DateRange(
      new Date('2018-05-01'),
      new Date('2018-07-01')
    )
    const aprilToJune = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-07-01')
    )

    const expression = new Or(new During(aprilAndMay), new During(mayAndJune))

    const concrete = expression.concrete(_2018)
    const expected = List.of(aprilToJune)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of multiple overlapping ranges', () => {
    const aprilAndMay = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-06-01')
    )
    const mayAndJune = new DateRange(
      new Date('2018-05-01'),
      new Date('2018-07-01')
    )
    const juneAndJuly = new DateRange(
      new Date('2018-06-01'),
      new Date('2018-08-01')
    )
    const julyAndAugust = new DateRange(
      new Date('2018-07-01'),
      new Date('2018-09-01')
    )
    const aprilToAugust = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-09-01')
    )

    const e1 = new Or(new During(aprilAndMay), new During(mayAndJune))
    const e2 = new Or(new During(juneAndJuly), new During(julyAndAugust))
    const expression = new Or(e1, e2)

    const concrete = expression.concrete(_2018)
    const expected = List.of(aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of overlapping ranges and distinct ranges', () => {
    const february = new DateRange(
      new Date('2018-02-01'),
      new Date('2018-03-01')
    )
    const aprilAndMay = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-06-01')
    )
    const mayAndJune = new DateRange(
      new Date('2018-05-01'),
      new Date('2018-07-01')
    )
    const juneAndJuly = new DateRange(
      new Date('2018-06-01'),
      new Date('2018-08-01')
    )
    const julyAndAugust = new DateRange(
      new Date('2018-07-01'),
      new Date('2018-09-01')
    )
    const aprilToAugust = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-09-01')
    )

    const e1 = new Or(new During(aprilAndMay), new During(mayAndJune))
    const e2 = new Or(new During(juneAndJuly), new During(julyAndAugust))
    const e3 = new Or(e1, e2)
    const expression = new Or(new During(february), e3)

    const concrete = expression.concrete(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of overlapping ranges and distinct ranges in order', () => {
    const february = new DateRange(
      new Date('2018-02-01'),
      new Date('2018-03-01')
    )
    const aprilAndMay = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-06-01')
    )
    const mayAndJune = new DateRange(
      new Date('2018-05-01'),
      new Date('2018-07-01')
    )
    const juneAndJuly = new DateRange(
      new Date('2018-06-01'),
      new Date('2018-08-01')
    )
    const julyAndAugust = new DateRange(
      new Date('2018-07-01'),
      new Date('2018-09-01')
    )
    const aprilToAugust = new DateRange(
      new Date('2018-04-01'),
      new Date('2018-09-01')
    )

    const e1 = new Or(new During(aprilAndMay), new During(julyAndAugust))
    const e2 = new Or(new During(juneAndJuly), new During(mayAndJune))
    const e3 = new Or(e1, e2)
    const expression = new Or(e3, new During(february))

    const concrete = expression.concrete(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })
})
