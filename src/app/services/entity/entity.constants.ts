
import EmailConstants from "../email/email.constants";
import FlowchartConstants from "../flowchart/flowchart.constants";

const EntityConstants = {
    EmailConstants, // adds EmailConstants.TYPE to EntityConstants
    ...EmailConstants, // adds TYPE to EntityConstants
    ...FlowchartConstants, // adds ACTION to EntityConstants

    // these should go into their respective files and concatenated, just using as an example
    // this should also be the key and not the value, constants should always be all caps
    ICONS: {
        [EmailConstants.TYPE.BULK]: 'glyph-email-bulk',
        [FlowchartConstants.ACTION.ADD]: 'glyph-flowchart-action-add'
    }
};

export default EntityConstants;
export const EMAIL_TYPE = EmailConstants.TYPE;
export const FLOWCHART_ACTION = FlowchartConstants.ACTION;
export const ENTITY_ICON = EntityConstants.ICONS;
