import GreenhouseCrawler from "./generics/greenhouse";

class SpliceCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/splice"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "splice"
}

export default SpliceCrawler