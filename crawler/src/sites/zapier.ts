import GreenhouseCrawler from "./generics/greenhouse";

class ZapierCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/zapier"
    WHITELIST_DEPARTMENTS = ["engineering", "product"]
    companySlug = "zapier"
}

export default ZapierCrawler