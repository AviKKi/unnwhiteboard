import GreenhouseCrawler from "./generics/greenhouse";

class GitlabCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/gitlab"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "gitlab"
}

export default GitlabCrawler