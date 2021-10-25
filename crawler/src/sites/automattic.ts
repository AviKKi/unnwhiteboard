import BaseCrawler, { RateLimitFunc } from "../baseCrawler";
import { JSDOM } from "jsdom";

class AutomatticCrawler extends BaseCrawler {
    constructor(requestLimiter: undefined | RateLimitFunc) {
        super(requestLimiter, { companySlug: "automattic" })
    }

    async parseDescriptionPage(url: string) {
        if (url === '') return {}
        const res = await this.get(url)
        const dom = new JSDOM(res.data as string)
        const title = dom.window.document.querySelector('h2')?.textContent
        const location = "Remote, Anywhere"
        return { title, location, applyUrl: url }
    }

    async start() {
        const res = await this.get('https://automattic.com/work-with-us/')
        const dom = new JSDOM(res.data as string)
        const categoriesContainer = dom.window.document.querySelectorAll('.position-category')
        const listingLinks: string[] = []
        for (const container of Array.from(categoriesContainer)) {
            if (container.querySelector("h3")?.textContent?.indexOf('Engineering') === 0) {
                container.querySelectorAll('a[class="position-listing"]').forEach(elm => listingLinks.push(elm.getAttribute('href') || ''))
            }
        }

        const results = await Promise.allSettled(listingLinks.map(l => this.parseDescriptionPage(l)))
        console.log(results)
    }
}

export default AutomatticCrawler