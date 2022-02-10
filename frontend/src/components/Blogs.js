import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getBlogs } from '../actions/blogActions'
import MetaData from './layouts/MetaData'
import Blog from './blog/Blog'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Sidebar from './blog/Sidebar'

const Blogs = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    

    const [ currentPage, setCurrentPage ] = useState(1)

    const { loading, blogs, blogsCount, resPerPage,  error } = useSelector( state => state.blogs )

    useEffect( () => {

        dispatch(getBlogs(currentPage))   
    
        if(error) {
            return alert.error(error)        
        }    

    }, [ dispatch, alert, error, currentPage ])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (       

        <Fragment>

            <MetaData title="Blogs" />                                      

            <div className="container">

                <div className="wrapper parent">  

                    <aside>

                        <Sidebar blogs={blogs} />                       

                    </aside>

                    <article className="relative">                         

                        <h1>Blogs</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div>                                    
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > blogsCount ? blogsCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{blogsCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {blogs && blogsCount > 0                             
                                        ?   blogs.map(blog => (
                                                <Blog key={blog._id} blog={blog} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= blogsCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={blogsCount}                        
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

export default Blogs
