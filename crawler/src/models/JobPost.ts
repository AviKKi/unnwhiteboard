import mongoose from 'mongoose'
import { prop, getModelForClass } from "@typegoose/typegoose";

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


export class JobPostClass {
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

    @prop({ required: true })
    public description?: string

    @prop({ required: true })
    public applyUrl?: string
}

const JobPost = getModelForClass(JobPostClass)

export default JobPost