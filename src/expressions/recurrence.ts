import { Moment } from 'moment'

export type Recurrence = (from: Moment) => Moment

export const weekly = (from: Moment) => from.clone().add(1, 'weeks')
export const biweekly = (from: Moment) => from.clone().add(2, 'weeks')

export const annually = (from: Moment) => from.clone().add(1, 'years')
//export const monthlyOnThe = (date: number) => (from: Moment) =>
