import { or, during } from '../src/expressions'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { boundedRangesEqual } from '../src/operations'
import { BoundedRanges } from '../src/temporalexpression'
import { _2018, monthOf, monthRange } from './utils'

describe('Or', () => {
  it('returns the union of two distinct ranges', () => {
    const april = monthOf(2018, 4)
    const july = monthOf(2018, 7)

    const expression = or(during(april), during(july))

    const concrete = expression.concrete(_2018)
    const expected = List.of(april, july)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of two adjacent ranges', () => {
    const april = monthOf(2018, 4)
    const may = monthOf(2018, 5)
    const aprilAndMay = monthRange(2018, 4, 2018, 5)

    const expression = or(during(april), during(may))

    const concrete = expression.concrete(_2018)
    const expected = List.of(aprilAndMay)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of two overlapping ranges', () => {
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)
    const aprilToJune = monthRange(2018, 4, 2018, 6)

    const expression = or(during(aprilAndMay), during(mayAndJune))

    const concrete = expression.concrete(_2018)
    const expected = List.of(aprilToJune)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of multiple overlapping ranges', () => {
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)
    const juneAndJuly = monthRange(2018, 6, 2018, 7)
    const julyAndAugust = monthRange(2018, 7, 2018, 8)
    const aprilToAugust = monthRange(2018, 4, 2018, 8)

    const e1 = or(during(aprilAndMay), during(mayAndJune))
    const e2 = or(during(juneAndJuly), during(julyAndAugust))
    const expression = or(e1, e2)

    const concrete = expression.concrete(_2018)
    const expected = List.of(aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of overlapping ranges and distinct ranges', () => {
    const february = monthOf(2018, 2)
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)
    const juneAndJuly = monthRange(2018, 6, 2018, 7)
    const julyAndAugust = monthRange(2018, 7, 2018, 8)
    const aprilToAugust = monthRange(2018, 4, 2018, 8)

    const e1 = or(during(aprilAndMay), during(mayAndJune))
    const e2 = or(during(juneAndJuly), during(julyAndAugust))
    const e3 = or(e1, e2)
    const expression = or(during(february), e3)

    const concrete = expression.concrete(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })

  it('returns the union of overlapping ranges and distinct ranges in order', () => {
    const february = monthOf(2018, 2)
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)
    const juneAndJuly = monthRange(2018, 6, 2018, 7)
    const julyAndAugust = monthRange(2018, 7, 2018, 8)
    const aprilToAugust = monthRange(2018, 4, 2018, 8)

    const e1 = or(during(aprilAndMay), during(julyAndAugust))
    const e2 = or(during(juneAndJuly), during(mayAndJune))
    const e3 = or(e1, e2)
    const expression = or(e3, during(february))

    const concrete = expression.concrete(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(boundedRangesEqual(concrete, expected)).toBeTruthy()
  })
})
