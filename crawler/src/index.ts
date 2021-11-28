import { getCrawlers } from "./sites"
import { RateLimit } from "async-sema"


async function main() {
    const limit = RateLimit(5)
    const companySlug = process.argv[2]
    const crawlers = await getCrawlers()
    for (const Crawler of crawlers) {
        const crawler = new Crawler(limit)
        if (companySlug && crawler.companySlug !== companySlug) continue
        crawler.start().then(() => crawler.dumpJobsList()).then(() => console.log(`[i] Crawling ${crawler.companySlug} complete`))
    }

}


main()