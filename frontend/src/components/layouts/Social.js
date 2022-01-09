import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Social = () => {

    return (

        <Fragment>

            <Link to="#!">
                <i className="fa fa-facebook facebook"/>
            </Link>
            <Link to="#!">
                <i className="fa fa-twitter"/>
            </Link>

        </Fragment>

    )

}

export default Social
