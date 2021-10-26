import mongoose from 'mongoose'
import { prop, getModelForClass } from "@typegoose/typegoose";

export class JobPostClass {
    @prop({ required: true })
    public title?: String

    @prop()
    public location?: String

    @prop({ unique: true, required: true })
    public slug?: String

    @prop()
    public company?: mongoose.Types.ObjectId

    @prop()
    public tags: String[] = []

    @prop({ required: true })
    public description?: String

    @prop({ required: true })
    public applyUrl?: String
}

const JobPost = getModelForClass(JobPostClass)

export default JobPost