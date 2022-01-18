import React, { Fragment } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const RichText = ({ text, setText }) => {

    return (

        <Fragment>

            <CKEditor
                editor={ClassicEditor}               
                data={text}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    setText(data)
                }}
            />
            
        </Fragment>

    )

}

export default RichText
