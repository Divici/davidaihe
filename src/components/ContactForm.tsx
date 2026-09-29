'use client';

import { useId, useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import {
  MESSAGE_MAX,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact';
import { site } from '@/content/site';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'failed'; message: string };

type FieldName = keyof ContactErrors;

const EMPTY: ContactValues = { name: '', email: '', message: '', company: '' };
const FIELD_ORDER: FieldName[] = ['name', 'email', 'message'];

export function ContactForm({ onSend }: { onSend: (values: ContactValues) => Promise<void> }) {
  const id = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const sending = status.kind === 'sending';

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== 'company' && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status.kind === 'sent' || status.kind === 'failed') setStatus({ kind: 'idle' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      await onSend(values);
      setValues(EMPTY);
      setStatus({ kind: 'sent' });
    } catch (error) {
      setStatus({
        kind: 'failed',
        message: error instanceof Error ? error.message : 'Your message could not be sent.',
      });
    }
  }

  function describe(field: FieldName) {
    return {
      id: `${id}-${field}`,
      'aria-invalid': errors[field] ? (true as const) : undefined,
      'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
    };
  }

  function errorFor(field: FieldName) {
    return errors[field] ? (
      <p className="field__error" id={`${id}-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          {...describe('name')}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
        />
        {errorFor('name')}
      </div>

      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          {...describe('email')}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
        />
        {errorFor('email')}
      </div>

      <div className="field">
        <label htmlFor={`${id}-message`}>Message</label>
        <textarea
          {...describe('message')}
          name="message"
          rows={6}
          required
          maxLength={MESSAGE_MAX + 1}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
        />
        {errorFor('message')}
      </div>

      <div className="field--trap" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="contact-form__foot">
        <button type="submit" className="btn btn--primary" disabled={sending}>
          <Send size={18} aria-hidden="true" />
          {sending ? 'Sending…' : 'Send message'}
        </button>

        {status.kind === 'sent' && (
          <p className="form-note form-note--ok" role="status">
            Message sent. I will reply to the address you gave.
          </p>
        )}
        {status.kind === 'failed' && (
          <p className="form-note form-note--bad" role="alert">
            {status.message} Try again, or email me at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
