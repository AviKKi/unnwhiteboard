import mongoose, { Document } from 'mongoose'
import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import allTags from '../constants/allTags';
import geocoder from '../geocoder';

class CompanyMeta {
    @prop({})
    public _id?: mongoose.Types.ObjectId
    @prop({})
    public name?: string
    @prop({})
    public slug?: string
    @prop({})
    public logoUrl?: string
}

class AccurateLocation {
    @prop()
    city?: string
    @prop()
    state?: string
    @prop()
    country?: string
    @prop()
    countryCode?: string
    @prop()
    district?: string

    @prop()
    remote?: boolean

    /** Remote job available everywhere in the world */
    public get anywhere() {
        return !(this.city || this.state || this.country)
    }

    /** String representation of a address */
    public get address() {
        return `${this.city}, ${this.state}, ${this.country} ${this.remote ? ' (Remote)' : ''}`
    }

}

@pre<JobPostClass>('findOneAndUpdate', async function () {
    const query = this.getUpdate()
    const post = await this.model.findOne(this.getQuery());

    // Parse location string into more details
    const accurateLocation: any = {}
    if (!post || !post.accurateLocation) {
        // @ts-ignore
        let location = (query.location || '').toLowerCase()
        accurateLocation['remote'] = location.indexOf('remote') != -1
        location = location.replace('remote')
        const results = await geocoder.geocode(location)
        if (results.length > 0) {
            accurateLocation['city'] = results[0]['city']
            accurateLocation['country'] = results[0]['country']
            accurateLocation['state'] = results[0]['state']
            accurateLocation['countryCode'] = results[0]['countryCode']
            accurateLocation['district'] = results[0]['district']
        }
        this.set('accurateLocation', accurateLocation)
    }

    // set filter tags
    let filterTags: string[] = []
    for (const tag of allTags) {
        // @ts-ignore
        if (query.title?.toLowerCase()?.indexOf(tag) !== -1 || query.description?.toLowerCase()?.indexOf(tag) !== -1)
            filterTags.push(tag)
    }
    this.set('filterTags', filterTags)
})
class JobPostClass {
    @prop({ required: true })
    public title?: string

    @prop()
    public location?: string

    @prop()
    public accurateLocation?: AccurateLocation

    @prop({ unique: true, required: true })
    public slug?: string

    @prop()
    public company?: CompanyMeta

    @prop()
    public tags: string[] = []

    @prop()
    public filterTags?: string[] = []

    @prop()
    public description?: string

    @prop({ required: true })
    public applyUrl?: string

    @prop()
    public postedDate?: Date
}

export { JobPostClass }

const JobPost = getModelForClass(JobPostClass, {
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})

export default JobPost