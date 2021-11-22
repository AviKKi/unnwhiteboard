import GreenhouseCrawler from "./generics/greenhouse";

class AlgoliaCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/algolia"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "algolia"
}

export default AlgoliaCrawler