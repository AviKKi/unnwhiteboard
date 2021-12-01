import LeverCrawler from "./generics/lever"

class CollaboraCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/collabora/?team=Engineering"
    companySlug = "collabora"
}

export default CollaboraCrawler