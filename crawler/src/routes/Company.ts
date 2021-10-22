import { Router, Response } from "express"
import Company from "../models/Company"

const router = Router()

router.get("/companies", async (req, res) => {
    const list = await Company.find({})
    // @ts-ignore
    res.json(list.map(l => l._doc))
})

router.get("/company/:slug", async (req, res) => {
    const match = await Company.find({ slug: req.params.slug })
    if (match.length === 0)
        res.status(404).send({ "non_field_errors": ["Company with given slug does not exist"] })
    else {
        // @ts-ignore
        res.json(match[0]._doc)
    }
})


export default router

