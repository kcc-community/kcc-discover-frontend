import { useState, useCallback } from 'react';


export const useLoading = (service) => {
    const [loading, setLoading] = useState(false)
    const fetch = useCallback(
        (param?: any) => {
            setLoading(true)
            return new Promise((resolve, reject) => {
                service(param).then(res => {
                    setLoading(false)
                    resolve(res)
                }).catch(err => {
                    setLoading(false)
                    reject(err)
                })
            })
        },
        [service],
    )
    return [loading, fetch] as const
}