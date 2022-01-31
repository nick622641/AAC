import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title, description }) => {

    return (
        
        <Helmet>
            <title>{`${title} - Abstract Art Canada`}</title>
            <meta 
                name="description" 
                content={description 
                    ? description.replace(/(<([^>]+)>)/gi, "").substring(0, 155) + '...' 
                    : 'Bold and beautiful abstract works of art by Canadian artists'
                } 
            />
        </Helmet>

    )

}

export default MetaData