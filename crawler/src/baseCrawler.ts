import { RateLimit } from "async-sema";
import axios, { Axios, AxiosRequestConfig } from 'axios'

export type RateLimitFunc = () => Promise<void>

class UnimplementedMethod extends Error { }

class BaseCrawler {
    /**
     * Rate limiting semaphone
     */
    limit: RateLimitFunc
    axios: Axios

    constructor(requestLimiter: undefined | RateLimitFunc,) {
        if (requestLimiter !== undefined)
            this.limit = requestLimiter
        else
            this.limit = RateLimit(5)
        this.axios = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            }
        })
    }

    /**
     * axios.get with rate limiting
     */
    async get(url: string, options?: AxiosRequestConfig) {
        await this.limit()
        return this.axios.get(url, options)
    }

    async start() {
        throw new UnimplementedMethod()
    }

    getLists() {
        throw new UnimplementedMethod()
    }

}

export default BaseCrawler