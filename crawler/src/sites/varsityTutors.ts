import GreenhouseCrawler from "./generics/greenhouse";

class VarsityTutorsCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/varsitytutors"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "varsity-tutors"
}

export default VarsityTutorsCrawler