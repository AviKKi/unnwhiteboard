import GreenhouseCrawler from "./generics/greenhouse";

class ShortcutCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/shortcut"
    WHITELIST_DEPARTMENTS = ["engineering", "product", "design"]
    companySlug = "shortcut"
}

export default ShortcutCrawler