import { prop, getModelForClass } from "@typegoose/typegoose";


export class CompanyClass {
    @prop()
    public name?: String;

    @prop({ unique: true })
    public slug?: string;

    @prop()
    public description?: String;

    @prop()
    public logoUrl?: String;

    @prop()
    public process?: String;

    @prop()
    public url?: string
}

const Company = getModelForClass(CompanyClass)

export default Company