import LeverCrawler from "./generics/lever"

class MattermostCrawler extends LeverCrawler {
    startUrl = "https://jobs.lever.co/mattermost/?team=Engineering"
    companySlug = "mattermost"
}

export default MattermostCrawler