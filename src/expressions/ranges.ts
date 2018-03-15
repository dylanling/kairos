import { DateRange } from 'moment-range'
import { List, Collection } from 'immutable'
import { Moment, max, min } from 'moment'

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

export function rangesEqual(
  lhs: List<DateRange>,
  rhs: List<DateRange>
): boolean {
  return (
    (lhs.isEmpty() && rhs.isEmpty()) ||
    (lhs.size === rhs.size &&
      lhs
        .zipWith((l, r) => dateRangesEqual(l, r), rhs)
        .every(bool => bool === true))
  )
}

export function intersection(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.overlaps(rhs) ? List.of(lhs.intersect(rhs)) : List.of()
}

function rangesToMoments(ranges: List<DateRange>): List<Moment> {
  return ranges.reduce(
    (moments: List<Moment>, range: DateRange) =>
      moments.concat(range.start, range.end),
    List.of()
  )
}

function momentsToRanges(moments: List<Moment>): List<DateRange> {
  const enumerated = moments.zip(moments.keySeq())
  const starts = enumerated
    .filter((_, index) => index % 2 == 0)
    .map(tuple => tuple[0])
  const ends = enumerated
    .filter((_, index) => index % 2 == 1)
    .map(tuple => tuple[0])

  return starts.zip(ends).map(tuple => new DateRange(tuple[0], tuple[1]))
}

function flatMap<T>(maybes: (T | undefined)[]): T[] {
  const reducer = (values: List<T>, maybe: T | undefined) =>
    maybe ? values.concat(maybe) : values
  return maybes.reduce(reducer, List.of()).toArray()
}

function safeReduction<T>(
  operation: (operands: T[]) => T,
  ...operands: (T | undefined)[]
): T {
  return operation(flatMap(operands))
}

export function mergeUsing(
  operator: (inLeft: boolean, inRight: boolean) => boolean,
  lhs: List<DateRange>,
  rhs: List<DateRange>
): List<DateRange> {
  if (lhs.isEmpty() && rhs.isEmpty()) {
    return lhs
  }
  let leftMoments = rangesToMoments(lhs)
  let rightMoments = rangesToMoments(rhs)

  const maxMoment = safeReduction(max, leftMoments.last(), rightMoments.last())
    .clone()
    .add(1, 'ms')
  leftMoments = leftMoments.concat(maxMoment)
  rightMoments = rightMoments.concat(maxMoment)

  let leftIndex = 0
  let rightIndex = 0

  let result: List<Moment> = List.of()

  let scan = safeReduction(min, leftMoments.first(), rightMoments.first())

  while (scan.isBefore(maxMoment)) {
    let inLeft = !(
      scan.isBefore(leftMoments.get(leftIndex)) !==
      (leftIndex % 2 === 1)
    )
    let inRight = !(
      scan.isBefore(rightMoments.get(rightIndex)) !==
      (rightIndex % 2 === 1)
    )
    let inResult = operator(inLeft, inRight) !== (result.size % 2 === 1)

    if (inResult) {
      result = result.concat(scan)
    }

    if (scan.isSame(leftMoments.get(leftIndex))) {
      leftIndex = leftIndex + 1
    }

    if (scan.isSame(rightMoments.get(rightIndex))) {
      rightIndex = rightIndex + 1
    }

    scan = safeReduction(
      min,
      leftMoments.get(leftIndex),
      rightMoments.get(rightIndex)
    )
  }
  return momentsToRanges(result)
}
