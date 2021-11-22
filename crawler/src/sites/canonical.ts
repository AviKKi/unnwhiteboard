import GreenhouseCrawler from "./generics/greenhouse";

class CanonicalCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/canonical"
    WHITELIST_DEPARTMENTS = ["cloud development", "date center field"]
    companySlug = "canonical"
}

export default CanonicalCrawler