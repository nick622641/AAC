import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getPainters } from '../actions/painterActions'
import MetaData from './layouts/MetaData'
import Painter from './painter/Painter'
import Loader from './layouts/Loader'
import Pagination from 'react-js-pagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Sidebar from './painter/Sidebar'

const Painters = () => {

    const dispatch = useDispatch()
    const alert    = useAlert()    

    const [ currentPage, setCurrentPage ] = useState(1)

    const { loading, painters, paintersCount, resPerPage,  error } = useSelector( state => state.painters )

    useEffect( () => {

        dispatch(getPainters(currentPage))   
    
        if(error) {
            return alert.error(error)        
        }    

    }, [ dispatch, alert, error, currentPage ])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (       

        <Fragment>

            <MetaData title="Painters" />                                      

            <div className="container">

                <div className="wrapper parent">  

                    <aside>

                        <Sidebar painters={painters} />                       

                    </aside>

                    <article className="relative">                         

                        <h1>Artist Biographies</h1>

                        {loading ? <Loader /> : (  

                            <Fragment>

                                <div>                                    
                                    <small>
                                        {resPerPage * (currentPage - 1) + 1} 
                                        &nbsp;-&nbsp; 
                                        {resPerPage * currentPage > paintersCount ? paintersCount : resPerPage * currentPage} 
                                        &nbsp;  / &nbsp;{paintersCount}
                                    </small> 
                                </div>

                                <div className="showroom">
                                    {painters && paintersCount > 0                             
                                        ?   painters.map(painter => (
                                                <Painter key={painter._id} painter={painter} />                                    
                                            )) 
                                        :   <p>No Results Found</p>
                                    }    
                                </div>

                                {resPerPage <= paintersCount && (
                                    <div onClick={() => window.scrollTo(0, 0)}>
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resPerPage}
                                            totalItemsCount={paintersCount}                        
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

export default Painters
