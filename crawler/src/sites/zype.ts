import GreenhouseCrawler from "./generics/greenhouse";

class ZypeCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/zype"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "zype"
}

export default ZypeCrawler