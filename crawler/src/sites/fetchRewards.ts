import GreenhouseCrawler from "./generics/greenhouse";

class FetchRewardsCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/fetchrewards"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "fetch-rewards"
}

export default FetchRewardsCrawler