// https://boards.greenhouse.io/artsy

import GreenhouseCrawler from "./generics/greenhouse";

class ArtsyCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/artsy"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "artsy"
}

export default ArtsyCrawler