import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getStaff } from '../actions/staffActions'
import { getFriends } from '../actions/friendActions'
import MetaData from './layouts/MetaData'
import Friend from './friends/Friend'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Sidebar from './staff/Sidebar'
import { Link } from 'react-router-dom'

const Friends = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    

    const [ currentPage, setCurrentPage ] = useState(1)

    const { loading, friends, friendCount, resPerPage, error } = useSelector( state => state.friends )
    const { staffMembers } = useSelector( state => state.staffMembers )

    useEffect( () => {

        dispatch(getStaff(1))   
        dispatch(getFriends(currentPage))   
    
        if(error) {
            return alert.error(error)        
        }    

    }, [ dispatch, alert, error, currentPage ])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (       

        <Fragment>

            <MetaData title="Friends of AAC" />                                      

            <div className="container">

                <div className="breadcrumbs">
                    <Link to="/">
                        <small>Home</small>
                    </Link>
                    &nbsp;/&nbsp;                  
                    <span>
                        <small>Friends of AAC</small>
                    </span>
                </div>

                <div className="wrapper parent">  

                    <aside>

                        <Sidebar staffMembers={staffMembers} friends={friends} />                       

                    </aside>

                    <article className="relative">                         

                        <h1>Friends of AAC</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div>                                    
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > friendCount ? friendCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{friendCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {friends && friendCount > 0                             
                                        ?   friends.map(friend => (
                                                <Friend key={friend._id} friend={friend} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= friendCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={friendCount}                        
                                            onChange={setCurrentPageNo}   
                                            nextPageText={<KeyboardArrowRightIcon />}  
                                            prevPageText={<KeyboardArrowLeftIcon />} 
                                            firstPageText={<FirstPageIcon />} 
                                            lastPageText={<LastPageIcon />}  
                                        />
                                    </div>
                                )} 

                            </Fragment> 
                        
                        )}

                    </article> 

                </div>

            </div>  

        </Fragment>       

    )

}

export default Friends
