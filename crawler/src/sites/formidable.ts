import GreenhouseCrawler from "./generics/greenhouse";

class FormidableCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/formidable"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "formidable"
}

export default FormidableCrawler