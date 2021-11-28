import GreenhouseCrawler from "./generics/greenhouse";

class KoalaIOCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/koalaio"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "koala-io"
}

export default KoalaIOCrawler