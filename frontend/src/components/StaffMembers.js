import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getStaff } from '../actions/staffActions'
import MetaData from './layouts/MetaData'
import Staff from './staff/Staff'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Sidebar from './staff/Sidebar'

const StaffMembers = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    

    const [ currentPage, setCurrentPage ] = useState(1)

    const { loading, staffMembers, staffCount, resPerPage,  error } = useSelector( state => state.staffMembers )

    useEffect( () => {

        dispatch(getStaff(currentPage))   
    
        if(error) {
            return alert.error(error)        
        }    

    }, [ dispatch, alert, error, currentPage ])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (       

        <Fragment>

            <MetaData title="Staff Members" />                                      

            <div className="container">

                <div className="wrapper parent">  

                    <aside>

                        <Sidebar staffMembers={staffMembers} />                       

                    </aside>

                    <article className="relative">                         

                        <h1>Staff Members</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div>                                    
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > staffCount ? staffCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{staffCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {staffMembers && staffCount > 0                             
                                        ?   staffMembers.map(staffMember => (
                                                <Staff key={staffMember._id} staffMember={staffMember} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= staffCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={staffCount}                        
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

export default StaffMembers
