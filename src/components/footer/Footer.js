import React from 'react';
import './Footer.css'
import {BsLinkedin, BsGithub} from 'react-icons/bs'

const Footer = (props) =>{
    
    return (
        <footer>
            <a href='' className='footer__logo'>DAVID</a>

            <ul className="permalinks">
                <li><a href='#'>Home</a></li>
                <li><a href='#about'>About</a></li>
                {/* <li><a href='#experience'>Experience</a></li> */}
                <li><a href='#portfolio'>Portfolio</a></li>
                {/* <li><a href='#testimonials'>Testimonials</a></li> */}
                <li><a href='#contact'>Contact</a></li>
            </ul>

            <div className="footer__socials">
                <a href='https://www.linkedin.com/in/david-aihe/' target='_blank' rel="noreferrer"><BsLinkedin /></a>
                <a href='http://github.com/divici' target='_blank' rel="noreferrer"><BsGithub /></a>
            </div>

            <div className="footer__copyright">
                <small>&copy; David Aihe. All rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer;