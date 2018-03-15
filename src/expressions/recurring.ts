import { TemporalExpression } from './expression'
import { Recurrence } from './recurrence'
import { List } from 'immutable'
import { DateRange } from 'moment-range'
import { Moment } from 'moment'
import { mergeUsing, empty } from './ranges'
import { Range } from './range'

export class Recurring extends TemporalExpression {
  readonly recurrence: Recurrence
  readonly firstRange: Range

  constructor(recurrence: Recurrence, firstRange: Range) {
    super()
    this.recurrence = recurrence
    this.firstRange = firstRange
  }

  ranges(reference: DateRange) {
    const start = this.firstRange.dateRange().start
    const ranges = this.recurrenceRanges(
      this.firstRange.dateRange().start,
      reference.end,
      List.of(this.rangeFromMoment(start))
    )

    return mergeUsing(
      (inLeft, inRight) => inLeft && inRight,
      List.of(reference),
      ranges
    )
  }

  recurrenceRanges(
    moment: Moment,
    end: Moment,
    ranges: List<DateRange>
  ): List<DateRange> {
    const next = this.recurrence(moment).clone()
    return next.isSameOrBefore(end)
      ? this.recurrenceRanges(
          next,
          end,
          ranges.concat(this.rangeFromMoment(next))
        )
      : ranges
  }

  rangeFromMoment(moment: Moment): DateRange {
    return new DateRange(
      moment,
      moment.clone().add(this.firstRange.dateRange().duration('ms'), 'ms')
    )
  }
}
