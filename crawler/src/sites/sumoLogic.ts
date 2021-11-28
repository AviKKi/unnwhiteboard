import GreenhouseCrawler from "./generics/greenhouse";

class SumoLogicCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/sumologic"
    WHITELIST_DEPARTMENTS = ["engineering", "it operations"]
    companySlug = "sumo-logic"
}

export default SumoLogicCrawler