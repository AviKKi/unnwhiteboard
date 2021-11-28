import GreenhouseCrawler from "./generics/greenhouse";

class FairwindsCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/fairwinds"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "fairwinds"
}

export default FairwindsCrawler