import GreenhouseCrawler from "./generics/greenhouse";

class DeliverooCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/deliveroo"
    WHITELIST_DEPARTMENTS = ["technology"]
    companySlug = "deliveroo"
}

export default DeliverooCrawler