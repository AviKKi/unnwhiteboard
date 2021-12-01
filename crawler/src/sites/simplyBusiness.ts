import LeverCrawler from "./generics/lever"

class SimplyBusinessCrawler extends LeverCrawler {
    // @todo implement multiple startUrl, for multiple departments
    startUrl = "https://jobs.lever.co/simplybusiness/?department=Engineering"
    companySlug = "simply-business"
}

export default SimplyBusinessCrawler