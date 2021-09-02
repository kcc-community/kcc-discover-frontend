import { get, post } from './axios'

export function getPairList(): Object{
  return get('/pair/list')
}

export function inWhiteList(data): Object{
  return get('/white/in', data)
}
