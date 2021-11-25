import LeverCrawler from "./generics/lever"

class ReplitCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/replit/?department=Engineering"
    companySlug = "replit"
}

export default ReplitCrawler