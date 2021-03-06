import { Router } from "express"
import JobPost from "../models/JobPost"

const router = Router()


router.get("/jobs", async (req, res) => {
    const LIMIT = 20
    const { filter, skip = 0, limit, location } = req.query
    let findParams: any = {}
    if (typeof filter === "string") {
        const filters = filter.split(',')
        findParams['filterTags'] = { $in: filters }
    }
    if (typeof location === "string") {
        const locationFilter = {
            $or: [
                { "location": location },
                { "accurateLocation.city": location },
                { "accurateLocation.country": location },
                { "accurateLocation.state": location },
            ]
        }
        if(findParams['filterTags'])
            findParams = {
                $and: [
                    locationFilter,
                    findParams['filterTags']
                ]
            }
        else
            findParams = locationFilter
    }

    const jobs = await JobPost.find(findParams, null, { sort: { postedDate: -1 }, limit: Number(limit) || LIMIT, skip: Number(skip) }).select({
        _id: 1,
        slug: 1,
        applyUrl: 1,
        company: {
            name: 1,
            slug: 1
        },
        location: 1,
        title: 1,
        postedDate: 1,
        // accurateLocation: 1
    })
    // @ts-ignore
    res.json(jobs.map(j => j.toJSON()))
})

router.get("/job/:slug", async (req, res) => {
    const { slug } = req.params
    const job = await JobPost.findOne({ slug })
    if (!job) {
        res.status(404).json({ "non_field_errors": [`Job Post with slug ${slug} not found`] })
    } else {
        // @ts-ignore
        res.json(job.toJSON())
    }
})

export default router