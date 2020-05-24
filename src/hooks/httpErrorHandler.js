import { useState, useEffect, useCallback } from 'react'

export default httpClient => {

    const [error, setError] = useState(null)

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req
    })
    const resInterceptor = httpClient.interceptors.response.use(
        res => res, error => setError(error))

    const ejectFunction = useCallback(() => {
        httpClient.interceptors.request.eject(reqInterceptor)
        httpClient.interceptors.response.eject(resInterceptor)
    }, [httpClient, reqInterceptor, resInterceptor])

    useEffect(() => () => {
        ejectFunction()
    }, [reqInterceptor, resInterceptor, ejectFunction])

    const cleanError = () => {
        setError(null)
    }

    return [error, cleanError]
}