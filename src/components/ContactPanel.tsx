'use client';

import emailjs from '@emailjs/browser';
import { ContactForm } from './ContactForm';
import { sendContact, type ContactValues } from '@/lib/contact';
import { emailjsConfig } from '@/content/emailjs';

const send = (values: ContactValues) =>
  sendContact(values, { send: emailjs.send, config: emailjsConfig });

export function ContactPanel() {
  return <ContactForm onSend={send} />;
}
