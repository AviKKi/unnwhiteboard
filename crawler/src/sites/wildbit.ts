import LeverCrawler from "./generics/lever"

class WildbitCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/wildbit/?team=Engineering"
    companySlug = "wildbit"
}

export default WildbitCrawler