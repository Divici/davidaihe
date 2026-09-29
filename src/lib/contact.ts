export type ContactValues = {
  name: string;
  email: string;
  message: string;
  /** Honeypot. People never see it; bots fill it in. */
  company: string;
};

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export type EmailConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

type Send = (
  serviceId: string,
  templateId: string,
  params: Record<string, string>,
  options: { publicKey: string },
) => Promise<unknown>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;
export const SEND_FAILED = 'Your message could not be sent.';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Enter your name.';

  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter an email like name@example.com.';

  if (message.length < MESSAGE_MIN) errors.message = `Write at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX)
    errors.message = 'Keep your message under 5,000 characters.';

  return errors;
}

export async function sendContact(
  values: ContactValues,
  { send, config, timeoutMs = 15000 }: { send: Send; config: EmailConfig; timeoutMs?: number },
): Promise<void> {
  if (values.company.trim()) return;

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('timeout')), timeoutMs);
  });

  try {
    await Promise.race([
      send(
        config.serviceId,
        config.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
        { publicKey: config.publicKey },
      ),
      timeout,
    ]);
  } catch {
    throw new Error(SEND_FAILED);
  } finally {
    clearTimeout(timer);
  }
}
