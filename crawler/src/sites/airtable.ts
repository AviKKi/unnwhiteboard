import GreenhouseCrawler from "./generics/greenhouse";

class AirtableCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/airtable"
    WHITELIST_DEPARTMENTS = ["engineering", "it & security"]
    companySlug = "airtable"
}

export default AirtableCrawler