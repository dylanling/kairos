import { Moment } from 'moment'

export type Recurrence = (from: Moment) => Moment

export const weekly = (from: Moment) => from.clone().add(1, 'weeks')
export const biweekly = (from: Moment) => from.clone().add(2, 'weeks')

export const annually = (from: Moment) => from.clone().add(1, 'years')

export const monthlyOnThe = (date: number) => (from: Moment) => {
  if (date < 1 || date > 28) {
    throw new RangeError(
      `cannot construct a monthly recurrence on the ${date} of the month`
    )
  }
  return from.date() < date
    ? from.clone().date(date)
    : from.month() === 12
      ? from
          .clone()
          .year(from.year() + 1)
          .month(0)
          .date(date)
      : from
          .clone()
          .month(from.month() + 1)
          .date(date)
}
