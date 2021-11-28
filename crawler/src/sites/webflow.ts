import GreenhouseCrawler from "./generics/greenhouse";

class WebflowCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/webflow"
    WHITELIST_DEPARTMENTS = ["engineering", "data", "design"]
    companySlug = "webflow"
}

export default WebflowCrawler