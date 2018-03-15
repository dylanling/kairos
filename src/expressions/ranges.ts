import { DateRange } from 'moment-range'
import { List } from 'immutable'

export const empty: List<DateRange> = List.of()

export function dateRangesEqual(
  lhs: DateRange | undefined,
  rhs: DateRange | undefined
): boolean {
  return lhs && rhs
    ? lhs.start.millisecond() === rhs.start.millisecond() &&
        lhs.end.millisecond() === rhs.end.millisecond()
    : false
}

export function dateRangesOverlap(
  left: DateRange | undefined,
  right: DateRange | undefined
): boolean {
  return left && right ? left.overlaps(right) : false
}

export function dateRangesAdjacent(
  left: DateRange | undefined,
  right: DateRange | undefined
): boolean {
  return left && right ? left.adjacent(right) : false
}

export function addIntersectingDateRanges(
  range: DateRange,
  maybeRange: DateRange | undefined
): List<DateRange> {
  return List.of(maybeRange ? range.add(maybeRange, { adjacent: true }) : range)
}

export function intersectionOfDateRanges(
  left: DateRange | undefined,
  right: DateRange | undefined
): List<DateRange> {
  return left && right && left.overlaps(right)
    ? List.of(left.intersect(right))
    : List.of()
}

export function intersection(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.overlaps(rhs) ? List.of(lhs.intersect(rhs)) : List.of()
}

export function rangesEqual(
  lhs: List<DateRange>,
  rhs: List<DateRange>
): boolean {
  return (
    (lhs.isEmpty() && lhs.isEmpty()) ||
    (lhs.size === rhs.size &&
      lhs
        .zipWith((l, r) => dateRangesEqual(l, r), rhs)
        .every(bool => bool === true))
  )
}
