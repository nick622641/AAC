import React, { useEffect, useState } from 'react'
import { animated, useTransition } from 'react-spring'
import Ticker from 'react-ticker'
import './slideshow.css'

const Slideshow = ({ data }) => {

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
        
        <div className="slideshow">
            {transitions((style, index) => (
                <animated.div className="slides"
                    style={{
                        ...style,                                            
                        backgroundImage: `url(${data[index].images[0].url})`
                    }} 
                />
            ))}
            <div className="ticker-container">
                <Ticker mode="smooth">
                    {({ index }) => (
                        
                        <h1>Abstract Art Canada</h1>
                    
                    )}
                </Ticker>
            </div>
        </div>         

  )

}

export default Slideshow