import GreenhouseCrawler from "./generics/greenhouse";

class MonzoCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/monzo"
    WHITELIST_DEPARTMENTS = ["engineering", "data", "design"]
    companySlug = "monzo"
}

export default MonzoCrawler