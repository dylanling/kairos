import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { BoundedRanges } from './temporalexpression'

export type RangeCombine = (lhs: DateRange, rhs: DateRange) => List<DateRange>

export function union(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.adjacent(rhs) || lhs.overlaps(rhs)
    ? List.of(lhs.add(rhs, { adjacent: true }))
    : List.of(lhs, rhs).sortBy(range => range.start)
}

export function intersection(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.overlaps(rhs) ? List.of(lhs.intersect(rhs)) : List.of()
}

export const unionReducer = (ranges: List<DateRange>, range: DateRange) =>
  ranges.isEmpty() || !ranges.last().overlaps(range)
    ? ranges.concat(List.of(range))
    : ranges.butLast().concat(ranges.last().add(range, { adjacent: true }))

export function boundedRangesEqual(
  lhs: BoundedRanges,
  rhs: BoundedRanges
): Boolean {
  return (
    lhs.size == rhs.size &&
    lhs.zipWith((l, r) => l.isEqual(r), rhs).reduce((l, r) => l && r, true)
  )
}
