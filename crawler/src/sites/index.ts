import * as fs from 'fs/promises'

import BaseCrawler from '../baseCrawler'

export async function getCrawlers() {
    const crawlers: typeof BaseCrawler[] = []
    const files = await fs.readdir(__dirname)

    for (const file of files) {
        if (file === 'index.ts' || file === 'index.js' || file === 'generics') continue
        try {
            const module = await import('./' + file)
            crawlers.push(module.default)
        } catch (err) {
            console.warn(` [x] ${err}`)
        }
    }
    return crawlers
}