import mongoose, { Document } from 'mongoose'
import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import allTags from '../constants/allTags';

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



@pre<JobPostClass>('findOneAndUpdate', async function () {
    const query = this.getUpdate()
    // const post = await this.model.findOne(this.getQuery()); 
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

const JobPost = getModelForClass(JobPostClass)

export default JobPost