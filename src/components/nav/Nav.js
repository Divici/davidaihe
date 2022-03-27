import React, {useState} from 'react';
import './Nav.css'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {BiBookOpen} from 'react-icons/bi'
import {MdOutlineWeb} from 'react-icons/md'
import {RiMessage2Line} from 'react-icons/ri'

const Nav = (props) =>{
    const [activeNav, setActiveNav] = useState('#')

    return (
        <nav>
            <a href='#' onClick={()=> setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><AiOutlineHome/></a>
            <a href='#about' onClick={()=> setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><AiOutlineUser/></a>
            <a href='#experience' onClick={()=> setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BiBookOpen/></a>
            <a href='#portfolio' onClick={()=> setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}><MdOutlineWeb/></a>
            <a href='#contact' onClick={()=> setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><RiMessage2Line/></a>
        </nav>
    )
}

export default Nav;