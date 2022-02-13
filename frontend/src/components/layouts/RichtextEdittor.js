import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const RichtextEdittor = ({ text, setText }) => {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )  
    const handleEditorChange = (state) => {
        setEditorState(state)
        setText(draftToHtml(convertToRaw(state.getCurrentContent())))
    }

    useEffect(() => {

        const contentBlock = htmlToDraft(text)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const _editorState = EditorState.createWithContent(contentState)   
        setEditorState(_editorState)  
              
    }, [ ])   // eslint-disable-line react-hooks/exhaustive-deps

  return (

    <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}  
        editorClassName="editor-area"   
        toolbarClassName="richtext-editor" 
        placeholder="Please enter your content here"
        stripPastedStyles
        spellCheck  
        toolbar={{
            image: {                                    
                alt: {
                        present: true,
                        mandatory: true
                    }
            }
        }}                             
    />

  )

}

export default RichtextEdittor