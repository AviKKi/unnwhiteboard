import GreenhouseCrawler from "./generics/greenhouse";

class RStudioCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/rstudio"
    WHITELIST_DEPARTMENTS = ["engineering", "product management"]
    companySlug = "rstudio"
}

export default RStudioCrawler