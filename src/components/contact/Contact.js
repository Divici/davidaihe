import React, { useRef } from 'react';
import emailjs from 'emailjs-com'
import './Contact.css'
import {HiOutlineMail} from 'react-icons/hi'
import {RiMessengerLine} from 'react-icons/ri'


const Contact = (props) =>{
    const form =useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_zx57bgm', 'template_xw6b998', form.current, 'JkQffBMfAuAOH6BAK')
          
        e.target.reset()
      };

    return (
        <section id='contact'>
            <h5>Get In Touch</h5>
            <h2>Contact Me</h2>

            <div className="container contact__container">
                <div className="contact__options">
                    <article className="contact__option">
                        <HiOutlineMail className='contact__option-icon'/>
                        <h4>Email</h4>
                        <h5>doa9200@gmail.com</h5>
                        <a href="mailto:doa9200@gmail.com" target='_blank' rel="noreferrer">Send a Message</a> 
                    </article>
                    <article className="contact__option">
                        <RiMessengerLine className='contact__option-icon'/>
                        <h4>Messenger</h4>
                        <h5>David Aihe</h5>
                        <a href="https://m.me/daihe" target='_blank' rel="noreferrer">Send a Message</a> 
                    </article>
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name='name' placeholder='Your Full Name' required />
                    <input type="email" name='email' placeholder='Your Email' required />
                    <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
                    <button type='submit' className='btn btn-primary'> Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact;