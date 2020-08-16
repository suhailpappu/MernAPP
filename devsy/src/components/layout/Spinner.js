import React, { Fragment } from 'react'
import spinner from '../layout/spinner.jpg'

export const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} 
            alt="Loading"
            style={{width:"200px",margin:"auto",display:"block",justifyContent:"center"}}
            />
        </Fragment>
    )
}
