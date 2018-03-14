import { monthOf, _2018, monthRange } from './helper'
import { or, during } from '../../src/expressions/expressions'
import { List } from 'immutable'
import { rangesEqual } from '../../src/expressions/ranges'

describe('Union', () => {
  it('returns the union of two distinct ranges', () => {
    const april = monthOf(2018, 4)
    const july = monthOf(2018, 7)

    const expression = or(during(april), during(july))

    const ranges = expression.ranges(_2018)
    const expected = List.of(april, july)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the union of two adjacent ranges', () => {
    const april = monthOf(2018, 4)
    const may = monthOf(2018, 5)
    const aprilAndMay = monthRange(2018, 4, 2018, 5)

    const expression = or(during(april), during(may))

    const ranges = expression.ranges(_2018)
    const expected = List.of(aprilAndMay)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })

  it('returns the union of two overlapping ranges', () => {
    const aprilAndMay = monthRange(2018, 4, 2018, 5)
    const mayAndJune = monthRange(2018, 5, 2018, 6)
    const aprilToJune = monthRange(2018, 4, 2018, 6)

    const expression = or(during(aprilAndMay), during(mayAndJune))

    const ranges = expression.ranges(_2018)
    const expected = List.of(aprilToJune)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
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

    const ranges = expression.ranges(_2018)
    const expected = List.of(aprilToAugust)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
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

    const ranges = expression.ranges(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
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

    const ranges = expression.ranges(_2018)
    const expected = List.of(february, aprilToAugust)

    expect(rangesEqual(ranges, expected)).toBeTruthy()
  })
})
