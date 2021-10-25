import AxelerantCrawler from "./sites/axelerant"
import AutomatticCrawler from "./sites/automattic"
import WeedMapsCrawler from "./sites/weedmaps"
import { RateLimit } from "async-sema"
function main() {
    const limit = RateLimit(5)
    const crawler = new WeedMapsCrawler(limit)
    crawler.start().then(() => crawler.dumpJobsList()).then(() => console.log("Crawling complete"))
}


main()