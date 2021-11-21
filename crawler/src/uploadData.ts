/**
 * Upload json files to the mongo DB 
 */
import fs from 'fs/promises'
import { JobsJSON } from './baseCrawler'

import connectDB from './config/database'
import Company from './models/Company'
import JobPost from './models/JobPost'

const OUTPUT_DIR = "output"

const getJsonFilenames = async () => {
    const names = await fs.readdir(OUTPUT_DIR)
    return names.filter(name => name.endsWith('.json'))
}

async function main() {
    try {
        await connectDB()
        let companiesList = await Company.find()
        const companies = companiesList.map(c => !!c.slug ? ({ [c.slug]: c }) : {}).reduce((x, y) => ({ ...x, ...y }), {})


        const jsonFiles = await getJsonFilenames()
        for (const filename of jsonFiles) {
            const data: JobsJSON = JSON.parse((await fs.readFile(`${OUTPUT_DIR}/${filename}`)).toString())
            const company = companies[data.companySlug]
            let addedJobs = 0

            if (!company) {
                console.warn(`[x] ${data.companySlug} not found in DB`)
            } else {
                for (const job of data.jobs) {
                    const slug = job.slug
                    if (slug) {
                        await JobPost.findOneAndUpdate(
                            { slug },
                            { ...job, company: {
                                _id: company.id,
                                name: company.name,
                                slug: company.slug,
                                logoUrl: company.logoUrl
                            } },
                            { upsert: true }
                        )
                        addedJobs += 1
                    }

                }
                console.log(`[i] ${addedJobs} jobs added for ${company.name}`)
            }
        }
    } catch (err) {
        console.warn(err)
    }
}

main()
    .then(() => console.log("[i] upload complete"))
    .finally(() => process.exit(0))