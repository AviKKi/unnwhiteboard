import LeverCrawler from "./generics/lever"

class BuildkiteCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/Buildkite/?team=Product%20team"
    companySlug = "buildkite"
}

export default BuildkiteCrawler