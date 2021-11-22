
import GreenhouseCrawler from "./generics/greenhouse";

class AdHocTeamCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/adhocteam"
    WHITELIST_DEPARTMENTS = ["digital services"]
    companySlug = "adhocteam"
}

export default AdHocTeamCrawler