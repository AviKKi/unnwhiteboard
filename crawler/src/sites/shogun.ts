import GreenhouseCrawler from "./generics/greenhouse";

class ShogunCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/getshogun"
    WHITELIST_DEPARTMENTS = ["engineering", "product"]
    companySlug = "shogun"
}

export default ShogunCrawler