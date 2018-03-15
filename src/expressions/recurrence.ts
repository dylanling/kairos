import { Moment } from 'moment'

export type Recurrence = (from: Moment) => Moment

export const weekly = (from: Moment) => from.clone().add(1, 'week')
//export const monthlyOnThe = (date: number) => (from: Moment) =>
