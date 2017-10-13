import {Injectable} from "@angular/core";
import * as Constants from "./entity.constants";
import EntityConstants, {ENTITY_ICON} from "./entity.constants";

@Injectable()

export class EntityService {
    constructor() {
        console.log(Constants);
        /*
            {default: {…}, EMAIL_TYPE: {…}, FLOWCHART_ACTION: {…}, ENTITY_ICON: {…}}
         */

        console.log(EntityConstants);
        /*
            equals default from Constants
            {EmailConstants: {…}, TYPE: {…}, ACTION: {…}, ICONS: {…}}
         */

        console.log(ENTITY_ICON);
        /*
            {bulk: "glyph-email-bulk", add: "glyph-flowchart-action-add"}
         */
    }
}
