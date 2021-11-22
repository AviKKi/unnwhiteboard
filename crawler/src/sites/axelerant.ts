import BaseCrawler, { RateLimitFunc } from "../baseCrawler";
import { JSDOM } from "jsdom";
import slugify from "slugify";

class AxelerantCrawler extends BaseCrawler {
    constructor(requestLimiter: undefined | RateLimitFunc) {
        super(requestLimiter, { companySlug: "axelerant" })
    }

    async parseDescriptionPage(url: string) {
        if (url === '') return {}
        const res = await this.get(url)
        const dom = new JSDOM(res.data as string)
        const title = dom.window.document.querySelector('h1')?.textContent?.trim()
        const location = dom.window.document.querySelector<HTMLElement>('li[title="Location"]')?.textContent?.trim()
        const timeType = dom.window.document.querySelector<HTMLElement>('li[title="Type"]')?.textContent?.trim()
        const experience = dom.window.document.querySelector<HTMLElement>('li[title="Experience"]')?.textContent?.trim()
        const description = dom.window.document.querySelector<HTMLElement>('div[class="description"]')?.textContent?.trim()
        const slug = slugify(`${this.companySlug} ${title}`)
        return { title, location, timeType, experience, applyUrl: url, slug, description }
    }

    async start() {
        const res = await this.get('https://www.axelerant.com/careers')
        const dom = new JSDOM(res.data as string)
        const axeJobs = Array.from(dom.window.document.querySelectorAll('.axe-apply-button'))
        let jobUrls = axeJobs.map((x: Element) => x.getAttribute('href') || '')
        jobUrls = jobUrls.slice(0, 4)
        console.log(jobUrls)
        const settled = await Promise.allSettled(jobUrls.map(url => this.parseDescriptionPage(url)))
        settled.filter(r => r.status === "fulfilled")
            .map(r => r.status === "fulfilled" && r.value)
            .forEach(
                // @ts-ignore
                job => this.jobsList.push(job)
            )

    }
}

export default AxelerantCrawler