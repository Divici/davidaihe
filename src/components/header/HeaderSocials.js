import React from 'react';
import {BsLinkedin, BsGithub} from 'react-icons/bs'

const HeaderSocials = (props) =>{
    
    return (
        <div className='header__socials'>
           <a href='https://www.linkedin.com/in/david-aihe/' target='_blank' rel="noreferrer"><BsLinkedin size='30px'/></a>
           <a href='http://github.com/divici' target='_blank' rel="noreferrer"><BsGithub size='30px'/></a>
        </div>
    )
}

export default HeaderSocials;