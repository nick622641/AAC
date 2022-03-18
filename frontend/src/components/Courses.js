import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getCourses } from '../actions/courseActions'
import MetaData from './layouts/MetaData'
import Course from './course/Course'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Sidebar from './course/Sidebar'

const Courses = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    

    const [ currentPage, setCurrentPage ] = useState(1)

    const { loading, courses, courseCount, resPerPage, error } = useSelector( state => state.courses )

    useEffect( () => {

        dispatch(getCourses(currentPage))   
    
        if(error) {
            return alert.error(error)        
        }    

    }, [ dispatch, alert, error, currentPage ])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (       

        <Fragment>

            <MetaData title="AAC Courses" />                                      

            <div className="container">

                <div className="wrapper parent">  

                    <aside>

                        <Sidebar courses={courses} />                       

                    </aside>

                    <article className="relative">                         

                        <h1>AAC Courses</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div>                                    
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > courseCount ? courseCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{courseCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {courses && courseCount > 0                             
                                        ?   courses.map(course => (
                                                <Course key={course._id} course={course} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= courseCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={courseCount}                        
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

export default Courses
