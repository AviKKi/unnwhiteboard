import LeverCrawler from "./generics/lever"

class StardogCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/stardog/?department=Engineering"
    companySlug = "stardog"
}

export default StardogCrawler