import LeverCrawler from "./generics/lever"

class TruoraCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/truora?team=Truora%20Engineering"
    companySlug = "truora"
}

export default TruoraCrawler