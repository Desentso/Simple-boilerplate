import { produce } from 'immer'

export const immerZustandMiddleware = config => (set, get, api) => config(fn => set(produce(fn)), get, api)
