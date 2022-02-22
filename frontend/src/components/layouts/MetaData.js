import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title, description, noIndex=false }) => {

    return (
        
        <Helmet>
            <title>{`${title} - Abstract Art Canada`}</title>
            <meta 
                name="description" 
                content={description 
                    ? description.replace(/(<([^>]+)>)/gi, "").substring(0, 155) + '...' 
                    : 'Bold and Beautiful Abstract works of art by Canadian Artists'
                } 
            />
            {noIndex === true && (
                 <meta name="robots" content="noindex" />
            )}           
        </Helmet>

    )

}

export default MetaData