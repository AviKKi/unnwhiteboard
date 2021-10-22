import { prop, getModelForClass } from "@typegoose/typegoose";


export class CompanyClass {
    @prop()
    public name?: String;

    @prop()
    public slug?: String;

    @prop()
    public description?: String;

    @prop()
    public logoUrl?: String;
}

const Company = getModelForClass(CompanyClass)

export default Company