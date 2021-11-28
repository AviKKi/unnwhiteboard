import GreenhouseCrawler from "./generics/greenhouse";

class SourceGraphCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/sourcegraph"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "sourcegraph"
}

export default SourceGraphCrawler