import AxelerantCrawler from "./axelerant"
import AutomatticCrawler from "./automattic"
import WeedMapsCrawler from "./weedmaps"
import ModeAnalyticsCrawler from "./mode_analytics"
import BaseCrawler from '../baseCrawler'
import AlgoliaCrawler from "./algolia"
import AbleCrawler from "./able"
import AdHocTeamCrawler from "./adhocteam"
import AirtableCrawler from "./airtable"
import CanonicalCrawler from "./canonical"
import MuxCrawler from "./mux"

export const Crawlers: typeof BaseCrawler[] = [
    AbleCrawler,
    AdHocTeamCrawler,
    AlgoliaCrawler,
    AirtableCrawler,
    AutomatticCrawler,
    AxelerantCrawler,
    CanonicalCrawler,
    ModeAnalyticsCrawler,
    WeedMapsCrawler,
    MuxCrawler,
]