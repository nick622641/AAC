import React, { Fragment } from 'react'

const FormattedDate = ({ iso, format }) => {

    const d = new Date(iso)

    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()

    const hours = d.getHours() + 1
    const minutes = d.getMinutes() + 1

    const date = day + ' / ' + month + ' / ' + year
    const time = hours + ':' + minutes

  return (

    <Fragment>
        
        {format === 'dateTime' ? date + ' at ' + time : date}

    </Fragment>

  )

}

export default FormattedDate