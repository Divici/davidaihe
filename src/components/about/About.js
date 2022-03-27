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
                            <small>1+ Years Working</small>
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
                    I am a Full-Stack Developer born in London and based in Washington DC. As an artist, I have a serious passion for creating clean and creative, dynamic user experiences.
                    <br></br><br></br>
                    My current goals are to help clients build professional and interactive websites, gain more experience, and build strong partnerships within the field.
                    </p>

                    <a href="#contact" className="btn btn-primary">Let's Talk</a>
                </div>
            </div>
        </section>
    )

}

export default About;