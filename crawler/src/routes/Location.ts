import { Router } from "express"
import JobPost from "../models/JobPost"

const router = Router()

/**
 * return location list for a given query or list of all countries, used in location search
 */
router.get("/location", async (req, res) => {
    let q = req.query?.q || ''
    q = (q as string).replace(/[^a-zA-Z ]/g, '').toLowerCase()
    if (q) {
        const re = new RegExp(`${q}`)
        const match = await JobPost.find({
            $or: [
                { "location": { $regex: re, $options: 'i' } },
                { "accurateLocation.city": { $regex: re, $options: 'i' } },
                { "accurateLocation.country": { $regex: re, $options: 'i' } },
                { "accurateLocation.state": { $regex: re, $options: 'i' } },
            ]
        }).select({ location: 1, accurateLocation: 1 })
        const matchStr: Set<string> = new Set()
        for (const m of match) {
            if (m.location?.toLowerCase()?.indexOf(q) != -1)
                matchStr.add(m.location || '')
            if (m.accurateLocation?.city?.toLowerCase()?.indexOf(q) != -1)
                matchStr.add(m.accurateLocation?.city || '')
            if (m.accurateLocation?.country?.toLowerCase()?.indexOf(q) != -1)
                matchStr.add(m.accurateLocation?.country || '')
            if (m.accurateLocation?.state?.toLowerCase()?.indexOf(q) != -1)
                matchStr.add(m.accurateLocation?.state || '')

            if (matchStr.size == 30)
                break
        }
        res.json({ match: Array.from(matchStr) })
    }
    else {
        const match = await JobPost.find({}).distinct('accurateLocation.country')
        res.json({ match })
    }
})

export default router