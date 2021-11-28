import GreenhouseCrawler from "./generics/greenhouse";

class GithubCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/github"
    WHITELIST_DEPARTMENTS = ["engineering", "product", "security"]
    companySlug = "github"
}

export default GithubCrawler