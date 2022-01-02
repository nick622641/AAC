import React, { Fragment, useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import MetaData from './layouts/MetaData'

const Home = () => {

    const data = [
        {
          url: "https://i1.wp.com/abstractartcanada.com/wp-content/uploads/2021/08/Songs-P2448_01.jpg?fit=1920%2C957&ssl=1",
        },
        {
          url: "https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/08/Homage-to-Paul.jpeg?fit=1343%2C1080&ssl=1",
        },
        {
          url: "https://i1.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Reflection-3.jpg?fit=1045%2C786&ssl=1",
        },
        {
          url: "https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Calm-Before-the-Storm-1.jpg?fit=1439%2C1080&ssl=1",
        },
        {
          url: "https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/A-Walk-in-the-Woods.jpg?fit=1429%2C1080&ssl=1",
        }
      ]

    const [ position, setPosition ] = useState(0)

    const transitions = useTransition(position, {
        key: position,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 2000 }
    })

    useEffect(() => {   
        let isMounted = true        
        setInterval(() => {
            if (isMounted) {
                setPosition((index) => ( index + 1 ) % data.length)
            }
        }, 10000)           
        return () => { isMounted = false }
    }, [data.length])

    return (

        <Fragment>

            <MetaData title={'Home'} />   

            <div className="slideshow">
                {transitions((style, index) => (
                    <animated.div 
                        style={{
                            ...style,                                            
                            backgroundImage: `url(${data[index].url})`
                        }} 
                    />
                ))}
            </div>         

            <div className="container">

                <div className="wrapper">            

                    <h1>Home</h1>

                </div>

            </div>                

        </Fragment>
    )
}

export default Home
