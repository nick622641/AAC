import React, { useCallback, useEffect, useState } from 'react'
import axios                                       from 'axios'
import { Editor                                  } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft                                 from 'html-to-draftjs'
import draftToHtml                                 from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './richtext.css'

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

    const urlencodeFormData = ( formData ) => {
        const params = new URLSearchParams()
        for( let pair of formData.entries() ) {
            typeof pair[1]=='string' && params.append( pair[0], pair[1] )
        }
        return params.toString()
    }

    const uploadImageCallBack = ( file ) => {    
        return new Promise(
            ( resolve ) => {
                const reader = new FileReader()
                reader.onload = async () => {
                    if ( reader.readyState === 2 ) {                       
                        const formData = new FormData()
                        formData.append( 'image', reader.result )  
                        const config = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'           
                            }
                        }                        
                        const data = await axios.post( '/api/v1/admin/image/new', urlencodeFormData(formData), config )
                        resolve( { data: { link: data.data.url } } )   
                    }                    
                }  
                reader.readAsDataURL( file )                  
            }
        )      
    }   
    
    const embedVideoCallcack = ( url ) => {
        if ( url.indexOf( 'youtube' ) >= 0 )  {
            url = url.replace( '/watch/'  , '/embed/' )
            url = url.replace( 'youtu.be/', 'youtube.com/embed/' )
            url = url.replace( 'watch?v=' , 'embed/' )               
        }    
        return url     
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
            toolbar={ 
                {                 
                    embedded: {
                        embedCallback: embedVideoCallcack,
                        defaultSize: {
                            height: '300',
                            width: '100%'
                        }
                    },               
                    image: {   
                        uploadCallback: uploadImageCallBack,  
                        previewImage: true,
                        alignmentEnabled: true,                        
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',                              
                        alt: {
                            present: true,
                            mandatory: true
                        },
                        defaultSize: {
                            width: 240,
                            height: 'auto'                        
                        }
                    },                              
                    fontFamily: {
                        options: ['Roboto', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']        
                    }                
                }
            }                             
        />

    )

}

export default RichtextEditor