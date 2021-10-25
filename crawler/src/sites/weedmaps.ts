import GreenhouseCrawler from "./generics/greenhouse";

class WeedMapsCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/weedmaps77"
    WHITELIST_DEPARTMENTS = ["engineering"]
}

export default WeedMapsCrawler