// Polyfill process.env for Stripe in MiniOxygen / Cloudflare Workers added by dev
if (typeof process === "undefined") {
  (globalThis as any).process = {
    env: {},
  };
}
import {RemixServer} from '@remix-run/react';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  // Capture “awc” from URL and set cookie
  try {
    const url = new URL(request.url);
    const awc = url.searchParams.get('awc');

    if (awc) {
      // Set cookie valid for 1 year, Secure & HttpOnly
      responseHeaders.append(
        'Set-Cookie',
        `awc=${awc}; Path=/; Secure; HttpOnly; Max-Age=${60 * 60 * 24 * 365}`
      );
    }
  } catch (err) {
    console.error('AWIN cookie set error:', err);
  }
  
  const {SANITY_PROJECT_ID: projectId} = loadContext.env;

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    imgSrc: [
      `'self'`,
      'https://cdn.shopify.com',
      'https://cdn.sanity.io',
      'https://lh3.googleusercontent.com',
      'https://rewoundtakeback.timex.com/',
      'https://mail.google.com/mail/u/0/',
      'https://cdn.anytimemailbox.com/portals/home/assets/images/homepage-anytime-mailbox-logo-black-2024.png',
      'https://maps.gstatic.com',
      'https://maps.googleapis.com',
      'data:',
    ],
    styleSrc: [
      `'self'`,
      `'unsafe-inline'`,
      'https://fonts.googleapis.com',
      'https://cdn.shopify.com',
      "https://anytime-mailbox.freshchat.com",
    ],
    scriptSrc: [
      `'self'`,
      'https://www.instagram.com',
      'https://cdn.shopify.com',
      'https://js.stripe.com/basil/stripe.js',
      'https://in.fw-cdn.com/32520975/1392281.js',
      'https://atmb-team-c26e0b650c4d16117551675.freshchat.com',
      'https://maps.googleapis.com',
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      'https://in.fw-cdn.com/32520975/1392281.js', // Freshchat preloader
      'https://anytime-mailbox.freshchat.com', // ✅ Freshchat widget domain
      "https://wchat.freshchat.com", // ✅ Freshchat widget domain
      'https://www.google.com/recaptcha/',
      'https://www.gstatic.com/recaptcha/',
    ],
    fontSrc: [
      `'self'`,
      'https://fonts.gstatic.com',
      'data:',
    ],
    frameAncestors: [
      `'self'`,
      'https://rewoundtakeback.timex.com/',
      'https://mail.google.com/mail/u/0/',
    ], // Who can embed *your* site
    frameSrc: [
      `'self'`,
      'https://www.instagram.com',
      'https://rewoundtakeback.timex.com/',
      'https://mail.google.com/mail/u/0/',
      'https://js.stripe.com/',
      'https://www.google.com/',
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      "https://anytime-mailbox.freshchat.com", // ✅ Allow Freshchat iframe
      'https://www.google.com/recaptcha/',
    ],
    connectSrc: [
      `'self'`,
      'https://monorail-edge.shopifysvc.com',
      `https://${projectId}.api.sanity.io`,
      `wss://${projectId}.api.sanity.io`,
      'https://rewoundtakeback.timex.com/',
      'https://mail.google.com/mail/u/0/',
      'http://localhost:*',
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'ws://*.tryhydrogen.dev:*',
      'https://maps.googleapis.com',
      'https://api.hsforms.com',
      'https://anytime-mailbox.freshchat.com', // ✅ Allow Freshchat API
       // ✅ Allow reCAPTCHA network requests
      'https://www.google.com/recaptcha/',
      'https://www.gstatic.com/recaptcha/',
      'https://development.anytimeapi.com/',
    ],
  });

  // Only apply CSP in production
  if (process.env.NODE_ENV === 'production') {
    responseHeaders.set('Content-Security-Policy', header);
  }

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  // For bots, wait until fully rendered
  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
