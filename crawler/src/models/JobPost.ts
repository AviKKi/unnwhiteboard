import mongoose from 'mongoose'
import { prop, getModelForClass } from "@typegoose/typegoose";

export class JobPostClass {
    @prop()
    public title?: String

    @prop()
    public slug?: String

    @prop()
    public company?: mongoose.Types.ObjectId

    @prop()
    public tags: String[] = []

    @prop()
    public description?: String

    @prop()
    public applyUrl?: String
}

const JobPost = getModelForClass(JobPostClass)

export default JobPost