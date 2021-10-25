import AxelerantCrawler from "./axelerant"
import AutomatticCrawler from "./automattic"
import WeedMapsCrawler from "./weedmaps"
import ModeAnalyticsCrawler from "./mode_analytics"
import BaseCrawler from '../baseCrawler'

export const Crawlers: typeof BaseCrawler[] = [AxelerantCrawler, AutomatticCrawler, WeedMapsCrawler, ModeAnalyticsCrawler]