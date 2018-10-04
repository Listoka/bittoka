import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import './draftTest.css';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


const DraftTools = () => {

    return (
        <div>
            {/* The Draft.js editing tools would be here */}
        </div>
    )

}

export default DraftTools;