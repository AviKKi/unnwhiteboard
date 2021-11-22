import { JSDOM } from "jsdom";
import BaseCrawler, { RateLimitFunc } from "../../baseCrawler";
import slugify from "slugify";

class GreenhouseCrawler extends BaseCrawler {

    startUrl: string = ""
    WHITELIST_DEPARTMENTS: string[] = []

    constructor(requestLimiter: undefined | RateLimitFunc) {
        super(requestLimiter)
    }


    async parseDescriptionPage(url: string) {
        const res = await this.get(url)
        const dom = new JSDOM(res.data as string)
        const title = dom.window.document.querySelector('h1')?.textContent?.trim()
        const location = dom.window.document.querySelector('div.location')?.textContent?.trim()
        const description = this.turndownService.turndown(dom.window.document.querySelector('div#content')?.innerHTML || '')
        const urlId = url.split('/')
        const slug = slugify(`${this.companySlug} ${title} ${urlId[urlId.length - 1]}`)
        const schemaMetas = this.getSchemaMeta(dom.window.document)
        let postedDate = schemaMetas.map(data => data?.datePosted)[0]
        return { title, location, description, applyUrl: url, tags: [], slug, postedDate }
    }


    async start() {

        const res = await this.get(this.startUrl)
        const dom = new JSDOM(res.data as string)

        // get department ids from the dropdown
        const departmentSelect = dom.window.document.getElementById('departments-select')
        const options = departmentSelect?.childNodes as NodeListOf<HTMLOptionElement>
        const departmentIds: string[] = [];
        options.forEach((option: HTMLOptionElement) => {
            const includeThisDep = this.WHITELIST_DEPARTMENTS.map(dep => option.textContent?.toLowerCase()?.indexOf(dep) !== -1).reduce((x, y) => x || y)
            if (includeThisDep && option.value) departmentIds.push(option.value)
        })

        // get the job urls for above selected departments
        let jobUrls: string[] = []
        for (const id of departmentIds) {
            const divs = Array.from(dom.window.document.querySelectorAll(`div.opening[department_id="${id}"]`))
            divs.forEach(d => {
                const url = d.querySelector('a')?.href
                if (url)
                    jobUrls.push(`https://boards.greenhouse.io${url}`)
            })
        }

        // crawl each job url
        const promises = jobUrls.map(url => this.parseDescriptionPage(url))
        const results = await Promise.allSettled(promises)
        for (const res of results) {
            if (res.status === "fulfilled") {
                this.jobsList.push(res.value)
            }
        }
    }

}

export default GreenhouseCrawler