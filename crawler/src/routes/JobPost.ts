import { Router } from "express"
import JobPost from "../models/JobPost"

const router = Router()


router.get("/jobs", async (req, res) => {
    const LIMIT = 20
    const { filter } = req.query
    let findParams: { filterTags?: any } = {}
    if (typeof filter === "string") {
        const filters = filter.split(',')
        findParams['filterTags'] = { $in: filters }
    }
    const jobs = await JobPost.find(findParams, null, { sort: { postedDate: -1 }, limit: LIMIT, })
    // @ts-ignore
    res.json(jobs.map(j => j._doc))
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