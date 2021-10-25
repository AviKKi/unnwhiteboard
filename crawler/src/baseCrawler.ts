import { RateLimit } from "async-sema";
import axios, { Axios, AxiosRequestConfig } from 'axios'
import fs from 'fs/promises'

import { JobPostClass } from "./models/JobPost"

export type RateLimitFunc = () => Promise<void>



class UnimplementedMethod extends Error { }

/**
 * Inherit this class to create crawlers
 */
class BaseCrawler {
    /**
     * Rate limiting semaphone
     */
    limit: RateLimitFunc
    axios: Axios
    jobsList: JobPostClass[] = []
    jsonDir: string = "output"

    constructor(requestLimiter: undefined | RateLimitFunc, jsonDir: string | undefined = "") {
        if (requestLimiter !== undefined)
            this.limit = requestLimiter
        else
            this.limit = RateLimit(5)
        this.axios = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            }
        })
        if (jsonDir) this.jsonDir = jsonDir
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

    /** Save the jobs list in a json file, specified by outputDir attribute */
    async dumpJobsList() {
        const filename = this.constructor.name.replace('Crawler', '')
        const file = await fs.open(`${this.jsonDir}/${filename}.json`, 'w+')
        await file.write(JSON.stringify(this.jobsList))
    }

}

export default BaseCrawler