import {  IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import {ICar} from "./ICarsProps"

export interface ICarsState {
    selectedTerms: IPickerTerms,
    cars: ICar[]
}