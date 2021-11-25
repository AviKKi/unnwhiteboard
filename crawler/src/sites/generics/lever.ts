import { JSDOM } from "jsdom"
import BaseCrawler, { RateLimitFunc } from "../../baseCrawler"
import slugify from "slugify"



class LeverCrawler extends BaseCrawler {

    startUrl: string = ""

    constructor(requestLimiter: undefined | RateLimitFunc) {
        super(requestLimiter)
    }

    async getJobUrls() {
        const res = await this.get(this.startUrl)
        const dom = new JSDOM(res.data as string)
        let urls: string[] = []
        dom.window.document.querySelectorAll('.posting-btn-submit').forEach(linkElement => {
            const href = linkElement.getAttribute('href')
            if (href) urls.push(href)
        })

        return urls
    }

    async parseDescriptionPage(url: string) {
        const res = await this.get(url)
        const dom = new JSDOM(res.data as string)
        const title = dom.window.document.querySelector('h2')?.textContent?.trim() as string
        const content = dom.window.document.querySelector('.content')
        content?.childNodes[1]
        const description = this.turndownService.turndown(content?.innerHTML || '')
        const urlId = url.split('/')
        const slug = slugify(`${this.companySlug} ${title} ${urlId[urlId.length - 1]}`)
        const schemaMetas = this.getSchemaMeta(dom.window.document)
        let postedDate = schemaMetas.map(data => data?.datePosted)[0]
        return {
            title,
            description,
            slug,
            postedDate,
            tags: []
        }
    }

    async start() {
        const jobUrls = await this.getJobUrls()

        // crawl each url
        const promises = jobUrls.map(url => this.parseDescriptionPage(url))
        const results = await Promise.allSettled(promises)
        console.log(results)
        for (const res of results) {
            if (res.status === "fulfilled") {
                this.jobsList.push(res.value)
            }
        }

    }

}

export default LeverCrawler