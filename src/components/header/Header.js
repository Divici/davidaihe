import React from 'react';
import './Header.css'
import CTA from './CTA';
import ME from '../../assets/me.png'
import HeaderSocials from './HeaderSocials';

const Header = (props) =>{
    
    return (
        <header>
            <div className='container header__container'>
                <h5>Hello I'm</h5>
                <h1>David Aihe</h1>
                <h5 className='text-light'>Fullstack Web Developer</h5>
                <CTA />
                <HeaderSocials />

                <div className='me'>
                    <img src={ME} alt='me' />
                </div>

                <a href='#contact' className='scroll__down'>Scroll Down</a>
            </div>

        </header>
    )
}

export default Header;