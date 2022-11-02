import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import ISurveyAnswer from "../models/ICarRenting";
import ICarRenting from "../models/ICarRenting";

export default class CarRentingService {
    private readonly _wpContext: WebPartContext;
    private readonly _spfi: SPFI;

    public constructor(webPartCtx: WebPartContext) {
        this._wpContext = webPartCtx;
        this._spfi = spfi().using(SPFx(webPartCtx));
    }

    public get(filter?: string): Promise<ICarRenting[]> {
        return new Promise((resolve, reject) => {
            return this._spfi.web.lists
                .getByTitle("Car Renting")
                .items.filter(filter || "")
                .select("ID", "Title", "Car/Title", "StartTime", "EndTime").expand("Car")()
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }
}
