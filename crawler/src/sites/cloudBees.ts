import GreenhouseCrawler from "./generics/greenhouse";

class CloudBeesCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/cloudbees"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "cloud-bees"
}

export default CloudBeesCrawler