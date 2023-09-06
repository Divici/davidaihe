import React from "react";
import './About.css'
import ME from '../../assets/me-about.png'
import {FaAward, FaUsers} from 'react-icons/fa'
import {VscFolderLibrary} from 'react-icons/vsc'

const About = (props) =>{

    return (
        <section id="about">
            <h5>Get To Know</h5>
            <h2>About Me</h2>

            <div className="container about__container">
                <div className="about__me">
                    <div className="about__me-image">
                        <img src={ME} alt="About Image" />
                    </div>
                </div>

                <div className="about__content">
                    <div className="about__cards">
                        <article className="about__card">
                            <FaAward className="about__icon"/>
                            <h5>Experience</h5>
                            <small>1.5 Years Working</small>
                        </article>

                        <article className="about__card">
                            <FaUsers className="about__icon"/>
                            <h5>Clients</h5>
                            <small>Reliable and Efficient Delivery</small>
                        </article>

                        <article className="about__card">
                            <VscFolderLibrary className="about__icon"/>
                            <h5>Projects</h5>
                            <small>50+ Completed</small>
                        </article>
                    </div>

                    <p>
                    I'm a Full Stack Software Engineer with a combined 1.5 years of experience in developing web apps that blend cutting-edge frontend design with robust backend functionality.
                    <br></br><br></br>
                    As an artist, I enjoy building immersive user experiences by leveraging technologies like React, TypeScript, Tailwind CSS, Java, and Spring Boot, to name a few.
                    <br></br><br></br>
                    I get excited about opportunities where I get to build powerful applications that effectively transform data into visually captivating representations, empowering small and large business owners alike in making well-informed decisions.
                    </p>

                    <a href="#contact" className="btn btn-primary">Let's Talk</a>
                </div>
            </div>
        </section>
    )

}

export default About;