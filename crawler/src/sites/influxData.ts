import GreenhouseCrawler from "./generics/greenhouse";

class InfluxDataCrawler extends GreenhouseCrawler {
    startUrl = "https://boards.greenhouse.io/influxdb"
    WHITELIST_DEPARTMENTS = ["engineering"]
    companySlug = "influx-data"
}

export default InfluxDataCrawler