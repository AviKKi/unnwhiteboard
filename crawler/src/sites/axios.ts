import GreenhouseCrawler from "./generics/greenhouse";

class AxiosCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/axios"
    WHITELIST_DEPARTMENTS = ["technology team", "product team"]
    companySlug = "axios"
}

export default AxiosCrawler