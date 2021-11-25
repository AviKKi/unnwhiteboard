import GreenhouseCrawler from "./generics/greenhouse";

class MuxCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/mux"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "mux"
}

export default MuxCrawler