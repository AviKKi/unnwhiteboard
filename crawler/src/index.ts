import AxelerantCrawler from "./sites/axelerant"
import AutomatticCrawler from "./sites/automattic"
import WeedMapsCrawler from "./sites/weedmaps"
import ModeAnalyticsCrawler from "./sites/mode_analytics"
import { Crawlers } from "./sites"
import { RateLimit } from "async-sema"


function main() {
    const limit = RateLimit(5)
    const companySlug = process.argv[2]
    for (const Crawler of Crawlers) {
        const crawler = new Crawler(limit)
        if (companySlug && crawler.companySlug !== companySlug) continue
        crawler.start().then(() => crawler.dumpJobsList()).then(() => console.log(`[i] Crawling ${crawler.companySlug} complete`))
    }

}


main()