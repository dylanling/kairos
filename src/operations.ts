import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { BoundedRanges } from './temporalexpression'

export function union(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.adjacent(rhs) || lhs.overlaps(rhs)
    ? List.of(lhs.add(rhs, { adjacent: true }))
    : List.of(lhs, rhs).sortBy(range => range.start)
}

export function intersection(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.overlaps(rhs) ? List.of(lhs.intersect(rhs)) : List.of()
}

export const unionReducer = (ranges: List<DateRange>, range: DateRange) =>
  ranges.isEmpty() ||
  !(ranges.last().overlaps(range) || ranges.last().adjacent(range))
    ? ranges.concat(List.of(range))
    : ranges.butLast().concat(ranges.last().add(range, { adjacent: true }))

export function boundedRangesEqual(
  lhs: BoundedRanges,
  rhs: BoundedRanges
): Boolean {
  return (
    lhs.size == rhs.size &&
    lhs.zipWith((l, r) => rangesEqual(l, r), rhs).reduce((l, r) => l && r, true)
  )
}

export function rangesEqual(lhs: DateRange, rhs: DateRange): Boolean {
  return (
    lhs.start.millisecond() === rhs.start.millisecond() &&
    lhs.end.millisecond() === rhs.end.millisecond()
  )
}
