import GreenhouseCrawler from "./generics/greenhouse";

class RockerboxCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/rockerbox"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "rockerbox"
}

export default RockerboxCrawler