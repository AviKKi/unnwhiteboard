import { RateLimit } from "async-sema";
import axios, { Axios, AxiosRequestConfig } from 'axios'
import fs from 'fs/promises'
import TurndownService from "turndown";

import { JobPostClass } from "./models/JobPost"

export type RateLimitFunc = () => Promise<void>



class UnimplementedMethod extends Error { }

export interface BaseCrawlerConfig {
    companySlug: string,
    jsonDir?: string
}

const defaultBaseCrawlerConfig: BaseCrawlerConfig = {
    companySlug: ""
}

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
    companySlug: string
    turndownService

    constructor(requestLimiter: undefined | RateLimitFunc, conf: BaseCrawlerConfig = defaultBaseCrawlerConfig) {
        if (requestLimiter !== undefined)
            this.limit = requestLimiter
        else
            this.limit = RateLimit(5)
        this.axios = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            }
        })
        if (conf.jsonDir) this.jsonDir = conf.jsonDir
        this.turndownService = new TurndownService()
        this.companySlug = conf.companySlug
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
        await file.close()
    }

}

export default BaseCrawler