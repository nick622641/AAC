import React, { useCallback, useEffect, useState } from 'react'
import axios                                       from 'axios'
import { Editor                                  } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft                                 from 'html-to-draftjs'
import draftToHtml                                 from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const RichtextEditor = ( { text, setText } ) => {

    const [ comment, setComment ] = useState( text )

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )

    const handleEditorChange = ( state ) => {   
        setEditorState( state )      
        if ( editorState.getCurrentContent().hasText() ) {
            setText( draftToHtml( convertToRaw( state.getCurrentContent() ) ) )  
        } else {
            setText('')           
        }          
    }

    const getComment = useCallback( ( text ) => {
        setComment( text )    
      }, [])

    useEffect(() => {  
        getComment( comment )
        const contentBlock = htmlToDraft( comment )
        const contentState = ContentState.createFromBlockArray( contentBlock.contentBlocks )
        const _editorState = EditorState.createWithContent( contentState )   
        setEditorState( _editorState )  
    }, [ comment, getComment ])  

    const uploadImageCallBack = ( file ) => {    
        return new Promise(
            ( resolve ) => {
                const reader = new FileReader()
                reader.onload = async () => {
                    if ( reader.readyState === 2 ) {
                        const formData = new FormData()
                        formData.append( 'image', reader.result )  
                        const data = await axios.post( '/api/v1/admin/image/new', formData )
                        resolve( { data: { link: data.data.url } } )   
                    }                    
                }  
                reader.readAsDataURL( file )                  
            }
        )      
    }          
    
    return (

        <Editor
            editorState={ editorState }
            onEditorStateChange={ handleEditorChange }  
            editorClassName='editor-area'   
            toolbarClassName='richtext-editor' 
            placeholder='Please enter your content here'
            stripPastedStyles
            spellCheck  
            toolbar={{
                image: {   
                    urlEnabled: true,
                    previewImage: true,
                    alignmentEnabled: true,
                    uploadCallback: uploadImageCallBack,                                
                    alt: {
                            present: true,
                            mandatory: true
                        },
                    defaultSize: {
                        width: 240,
                        height: 'auto'                        
                    }
                },   
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',             
                fontFamily: {
                    options: ['Roboto', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']        
                }                
            }}                             
        />

    )

}

export default RichtextEditor