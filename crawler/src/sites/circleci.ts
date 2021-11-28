import GreenhouseCrawler from "./generics/greenhouse";

class CircleCICrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/circleci"
    WHITELIST_DEPARTMENTS = ["engineering", "product"]
    companySlug = "circle-ci"
}

export default CircleCICrawler