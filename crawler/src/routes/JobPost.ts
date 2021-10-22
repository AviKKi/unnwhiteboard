import { Router } from "express"
import JobPost from "../models/JobPost"

const router = Router()


router.get("/jobs", async (req, res) => {
    const jobs = await JobPost.find({})
    // @ts-ignore
    res.json(jobs.map(j => j._doc))
})

router.get("/job/:slug", async (req, res)=>{
    const {slug} = req.params
    const job = await JobPost.findOne({slug})
    if(!job){
        res.status(404).json({"non_field_errors": [`Job Post with slug ${slug} not found`]})
    } else {
        // @ts-ignore
        res.json(job._doc)
    }
})

export default router