import GreenhouseCrawler from "./generics/greenhouse";

class BryterCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/bryter"
    WHITELIST_DEPARTMENTS = ["product & development"]
    companySlug = "bryter"
}

export default BryterCrawler