import React from 'react';
import './Portfolio.css'
import data from '../../data'

const Portfolio = (props) =>{
    
    return (
        <section id='portfolio'>
            <h5>My Recent Work</h5>
            <h2>Portfolio</h2>

            <div className="container portfolio__container">
                {
                    data.map(({id, image, title, github, demo, description}) =>{
                       return (
                            <article key={id} className="portfolio__item">
                                <div className="portfolio__item-image">
                                    <img src={image} alt={title} />
                                </div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <div className="portfolio__item-cta">
                                    <a href={github} className='btn' target='_blank' rel="noreferrer">Github</a>
                                    <a href={demo} className='btn btn-primary' target='_blank' rel="noreferrer">Live Demo</a>
                                </div>
                            </article> 
                       ) 
                    })
                }
            </div>
        </section>
    )
}

export default Portfolio;