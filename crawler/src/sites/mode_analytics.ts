import GreenhouseCrawler from "./generics/greenhouse";

class ModeAnalyticsCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/modeanalytics"
    WHITELIST_DEPARTMENTS = ["engineering"]
}

export default ModeAnalyticsCrawler