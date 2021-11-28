import * as fs from 'fs/promises'

import BaseCrawler from '../baseCrawler'

export async function getCrawlers() {
    const crawlers: typeof BaseCrawler[] = []
    const files = await fs.readdir('./')
    for (const file of files) {
        if (file === 'index.ts' || file === 'generics') continue
        const module = await import('./' + file)
        crawlers.push(module)
    }
    return crawlers
}