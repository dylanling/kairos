import { DateRange } from 'moment-range'
import { List, fromJS, Map } from 'immutable'

export const _2018 = new DateRange(
  new Date('2018-01-01'),
  new Date('2019-01-01')
)

export const monthOf = (year: number, month: number) =>
  new DateRange(new Date(year, month - 1, 1), new Date(year, month, 1))

export const monthRange = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
) =>
  new DateRange(
    new Date(startYear, startMonth - 1, 1),
    new Date(endYear, endMonth, 1)
  )

const months = List.of(
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
)

export const monthsOfYear = (year: number) =>
  months
    .toMap()
    .flip()
    .map(n => monthOf(year, n + 1))
