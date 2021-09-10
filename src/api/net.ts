import { get, post } from './axios'

export function getDappList(data): Object{
  return get('/api/v1/explore', data)
}

export function getDappCategory(): Object{
  return get('/api/v1/categories')
}

export function getDappInfo(app): Object{
  return get('/api/v1/app/' + app)
}

export function getDappComment(data): Object{
  return get('/api/v1/app/' + data.app + `/comments?page=${data?.page}&limit=5&user=${data?.user}`)
}

export function getDappReviwer(data): Object{
  return get('/api/v1/comments/' + `${data?.reviewer}?page=${data?.page}&limit=${data?.limit}`)
}