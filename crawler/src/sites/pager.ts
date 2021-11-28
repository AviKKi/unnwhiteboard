import GreenhouseCrawler from "./generics/greenhouse";

class PagerCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/pager"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "pager"
}

export default PagerCrawler