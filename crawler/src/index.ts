import AxelerantCrawler from "./sites/axelerant"
import AutomatticCrawler from "./sites/automattic"
import WeedMapsCrawler from "./sites/weedmaps"
import ModeAnalyticsCrawler from "./sites/mode_analytics"
import { RateLimit } from "async-sema"
function main() {
    const limit = RateLimit(5)
    const crawler = new ModeAnalyticsCrawler(limit)
    crawler.start().then(() => crawler.dumpJobsList()).then(() => console.log("Crawling complete"))
}


main()