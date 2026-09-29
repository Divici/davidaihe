// EmailJS identifiers are public by design: they ship in the browser bundle.
// Override per environment with NEXT_PUBLIC_EMAILJS_* variables.
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'service_zx57bgm',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'template_xw6b998',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? 'JkQffBMfAuAOH6BAK',
} as const;
