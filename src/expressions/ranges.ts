import { DateRange } from 'moment-range'
import { List } from 'immutable'
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
    (lhs.isEmpty() && lhs.isEmpty()) ||
    (lhs.size === rhs.size &&
      lhs
        .zipWith((l, r) => dateRangesEqual(l, r), rhs)
        .every(bool => bool === true))
  )
}

export function intersection(lhs: DateRange, rhs: DateRange): List<DateRange> {
  return lhs.overlaps(rhs) ? List.of(lhs.intersect(rhs)) : List.of()
}

const rangesToMoments = (ranges: List<DateRange>): List<Moment> =>
  ranges.reduce(
    (moments: List<Moment>, range: DateRange) =>
      moments.concat(range.start, range.end),
    List.of()
  )

const momentsToRanges = (moments: List<Moment>): List<DateRange> => {
  const enumerated = moments.zip(moments.keySeq())
  const starts = enumerated
    .filter((_, index) => index % 2 == 0)
    .map(tuple => tuple[0])
  const ends = enumerated
    .filter((_, index) => index % 2 == 1)
    .map(tuple => tuple[0])

  return starts.zip(ends).map(tuple => new DateRange(tuple[0], tuple[1]))
}

const typeSafeBinaryMomentOperation = (
  operation: (...moments: Moment[]) => Moment,
  left: Moment | undefined,
  right: Moment | undefined
) => {
  if (left && right) {
    return operation(left, right)
  } else if (left) {
    return left
  } else if (right) {
    return right
  } else {
    throw new RangeError(
      'cannot compute binary operation of two undefined values'
    )
  }
}

const withGreatestMax = (operand: List<Moment>, other: List<Moment>) =>
  typeSafeBinaryMomentOperation(max, operand.last(), other.last()).isAfter(
    operand.last()
  )
    ? operand.concat(other.last()) //.add(1, 'ms')
    : operand

export function mergeUsing(
  operator: (a: boolean, b: boolean) => boolean,
  lhs: List<DateRange>,
  rhs: List<DateRange>
): List<DateRange> {
  if (lhs.isEmpty() && rhs.isEmpty()) {
    return lhs
  }
  const leftMoments = rangesToMoments(lhs)
  const rightMoments = rangesToMoments(rhs)

  const maxMoment = typeSafeBinaryMomentOperation(
    max,
    leftMoments.last(),
    rightMoments.last()
  )

  let leftIndex = 0
  let rightIndex = 0

  let result: List<Moment> = List.of()

  let scan = typeSafeBinaryMomentOperation(
    min,
    leftMoments.first(),
    rightMoments.first()
  )
  while (scan.isBefore(maxMoment)) {
    let inLeft = scan.isBefore(leftMoments.get(leftIndex)) && leftIndex % 2 == 1
    let inRight =
      scan.isBefore(rightMoments.get(rightIndex)) && rightIndex % 2 == 1
    let inResult = operator(inLeft, inRight)

    if (inResult !== (result.size % 2 == 1)) {
      result = result.concat(scan)
    }

    if (scan.isSame(leftMoments.get(leftIndex))) {
      leftIndex = leftIndex + 1
    }

    if (scan.isSame(rightMoments.get(rightIndex))) {
      rightIndex = rightIndex + 1
    }

    scan = typeSafeBinaryMomentOperation(
      min,
      leftMoments.get(leftIndex),
      rightMoments.get(rightIndex)
    )
  }
  return momentsToRanges(result)
}
