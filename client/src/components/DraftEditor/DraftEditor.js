import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import './draftTest.css';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


const DraftEditor = () => {

    return (
        <div>
            {/* The Draft.js text editing would be located here. 
            This is where the user would enter the text on the page */}
        </div>
    )

}

export default DraftEditor;