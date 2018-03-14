import { TemporalExpression } from './expression'
import { DateRange } from 'moment-range'
import { List } from 'immutable'
import {
  dateRangesOverlap,
  dateRangesAdjacent,
  addIntersectingDateRanges
} from './ranges'

export class Union extends TemporalExpression {
  readonly left: TemporalExpression
  readonly right: TemporalExpression

  constructor(left: TemporalExpression, right: TemporalExpression) {
    super()
    this.left = left
    this.right = right
  }

  ranges(reference: DateRange): List<DateRange> {
    const reducer = (ranges: List<DateRange>, range: DateRange) =>
      ranges.isEmpty() ||
      !(
        dateRangesOverlap(range, ranges.last()) ||
        dateRangesAdjacent(range, ranges.last())
      )
        ? ranges.concat(List.of(range)).toList()
        : ranges
            .butLast()
            .concat(addIntersectingDateRanges(range, ranges.last()))
            .toList()

    return this.left
      .ranges(reference)
      .concat(this.right.ranges(reference))
      .sortBy(range => range.start)
      .reduce(reducer, List.of())
  }
}
