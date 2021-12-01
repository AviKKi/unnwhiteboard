import LeverCrawler from "./generics/lever"

class PrimaryCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/primary-2?team=Tech"
    companySlug = "primary"
}

export default PrimaryCrawler