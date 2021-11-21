import { prop, getModelForClass } from "@typegoose/typegoose";


export class CompanyClass {
    @prop()
    public name?: string;

    @prop({ unique: true })
    public slug?: string;

    @prop()
    public description?: string;

    @prop()
    public logoUrl?: string;

    @prop()
    public process?: string;

    @prop()
    public url?: string
}

const Company = getModelForClass(CompanyClass)

export default Company