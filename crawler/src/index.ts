import AxelerantCrawler from "./sites/axelerant"
import AutomatticCrawler from "./sites/automattic"
import { RateLimit } from "async-sema"
function main() {
    const limit = RateLimit(5)
    const crawler = new AutomatticCrawler(limit)
    crawler.start().then(() => console.log("Crawling complete"))
}


main()