import GreenhouseCrawler from "./generics/greenhouse";

class AbleCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/able"
    WHITELIST_DEPARTMENTS = ["engineering", ]
    companySlug = "able"
}

export default AbleCrawler