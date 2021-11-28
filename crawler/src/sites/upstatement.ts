import GreenhouseCrawler from "./generics/greenhouse";

class UpstatementCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/upstatement"
    WHITELIST_DEPARTMENTS = ["engineering", "design"]
    companySlug = "upstatement"
}

export default UpstatementCrawler