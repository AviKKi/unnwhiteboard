import LeverCrawler from "./generics/lever"

class AirbaseCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/airbase?department=Engineering"
    companySlug = "airbase"
}

export default AirbaseCrawler