import React, { Fragment, useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { Link } from 'react-router-dom'
import MetaData from './layouts/MetaData'

const Home = () => {    
   
    const [ imgIndex, setImgIndex ] = useState(0)     
    const [ left,     setLeft     ] = useState(0)
    
    const moveLeft  = () => { 
        const item = document.querySelector('.carousel li')
        const width = item.offsetWidth * -1 
        setImgIndex(imgIndex - 1) 
        setLeft(width * (imgIndex - 1))
    }
    const moveRight = () => { 
        const item = document.querySelector('.carousel li')
        const width = item.offsetWidth * -1 
        setImgIndex(imgIndex + 1) 
        setLeft(width * (imgIndex + 1))
    }

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

    const slides = [
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/09/Blue-Lightiv.jpg?fit=792%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/09/Blue-Lightiii.jpg?fit=810%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/09/Blue-Lightii.jpg?fit=825%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/09/Blue-Lighti-e1631215978370.jpg?fit=788%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/The-Floating-Mind-e1625610542725.jpg?fit=785%2C1063&ssl=1'
        },
        {
            url:'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Mandala-Armarilla-e1625609067275.jpg?fit=772%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Dimensional-Shift.jpg?fit=807%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Cortical-Retreat.jpg?fit=807%2C1080&ssl=1'
        },
        {
            url: 'https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Bhuvanakrtimandalam.jpg?fit=795%2C1080&ssl=1'
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

                    <div className="parent">
                        <div className="col-6">
                            <img src="https://res.cloudinary.com/marine-graphics/image/upload/v1640544376/products/ccjfh4na1pvylu8cilvp.jpg" alt="" />
                        </div>
                        <div className="parent col-6 wrapper callout">
                            <h3>BROWSE THE COLLECTION</h3>

                            <h2>Latest Work</h2>

                            <p>Striking and affordable original works of abstract art by global artists. Inspired in Canada, driven by emotion and powered by colour and texture.</p>
                         
                            <Link className="submit" to="/artwork/61c8b87881e3744d5c99d26b">
                                Shop Now 
                                <i className="fa fa-chevron-right" />
                            </Link>
                        </div>
                    </div>   
                    <div className="parent" style={{ margin: "80px 0 0 0" }}>
                        <div className="col-6">
                            <h3>Share</h3>

                            <h4>SPREAD THE WORD ABOUT ABSTRACT ART CANADA</h4>

                            <div className="icons">  
                                <Link to="!#" target="_blank">
                                    <i className="fa fa-facebook facebook" />
                                </Link>
                                <Link to="!#" target="_blank">
                                    <i className="fa fa-twitter" />
                                </Link>
                            </div> 
                        </div>
                        <div className="col-6">
                            <h2>Bold and beautiful abstract works of art by Canadian artists</h2>

                            <p>At Abstract Art Canada, we are committed to providing original art that's accessible and affordable. Beautiful, reasonably priced art that would look perfect in any home or workspace. In various sizes and styles, our artists create art that you can appreciate every day.   The artists at Abstract Art Canada are drawn to bold shapes and colours. They create art with feeling to produce something unique that might leave you reminded of a past experience.   We love creating and we want everyone else to share our love therefore we sell our art at reasonable prices.   Fancy having a go? In addition to selling our art, we offer free online courses for beginners. All you need is a drop of courage and a splash of curiosity.</p>

                        </div> 
                        <div>
                        
                        </div>   
                    </div>  

                </div>
            </div>  
            
            <section style={{ backgroundImage: "url(https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/08/Songs-P2448_01.jpg?fit=1920%2C957&ssl=1)" }}>
                <div className="wrapper callout parent">
                    <h3>Quentin Caron</h3>
                    <h2>Songs-P2448_01</h2>
                    <p>From his Songs series, Songs-P2448_01, artist Quentin Caron describes each as "an abstract, playful and surreal contemporary painting." Quentin creates each one as a poem.</p>

                    <Link className="submit" to="/artwork/61c8cad58eae4a8146dacc80">
                        Explore
                        <i className="fa fa-chevron-right" />
                    </Link>
                </div>
            </section>

            <div className="container">
                <div className="wrapper" style={{ position: "relative" }}>
                    <div className="carousel">
                        <ul style={{ left: `${left}px` }}>    

                            {slides && slides.map((slide, index) => (
                                <li 
                                    key={index}
                                    className={index === (imgIndex + 1) ? 'active' : ''}
                                >
                                    <img 
                                        src={slide.url} 
                                        className="centered-image"
                                        alt="" 
                                    />
                                </li>
                            ))}                              
                        </ul>
                    </div>
                    <div className="arrow-buttons">
                        <i 
                            className={imgIndex > 0 ? 'fa fa-chevron-left' : ''} 
                            onClick={moveLeft}
                        />
                        <i 
                            className={imgIndex < 6 ? 'fa fa-chevron-right' : ''}
                            onClick={moveRight}
                        />
                    </div>
                </div>
                <div className="wrapper">
                    <div className="text-center">
                        <h2>Image Title</h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
                    </div>
                </div>
            </div>

            <div className="bg-grey">
                <div className="container">
                    <div className="wrapper">
                        <div className="parent reverse">
                            <div className="col-6 no-font">
                                <img src="https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/06/SRB-SEP.jpg?fit=1485%2C1080&ssl=1"  alt="" />
                            </div>
                            <div className="wrapper parent callout col-6">
                                <h3>Sub Heading</h3>
                                <h2>Heading</h2>
                                <p>Paragraph text</p>
                            </div>
                        </div>
                        <div className="parent">
                            <div className="col-6 relative no-font">
                                <img className="cta" src="https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Magical-Sunset-e1626646282638.jpg?fit=559%2C442&ssl=1" alt="" />
                            </div>
                            <div className="col-6 last-image">                                
                                <img src="https://i0.wp.com/abstractartcanada.com/wp-content/uploads/2021/07/Fall-in-Love-e1626646166558.jpg?fit=1386%2C1023&ssl=1" alt="" />                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Home
