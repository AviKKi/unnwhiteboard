import GreenhouseCrawler from "./generics/greenhouse";

class MapboxCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/mapbox"
    WHITELIST_DEPARTMENTS = ["solutions architecture", "platform"]
    companySlug = "mapbox"
}

export default MapboxCrawler