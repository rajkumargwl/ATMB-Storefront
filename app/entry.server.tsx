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
    ],
    scriptSrc: [
      `'self'`,
      'https://www.instagram.com',
      'https://cdn.shopify.com',
      'https://js.stripe.com/basil/stripe.js',
      'https://in.fw-cdn.com/32520975/1392281.js',
      'https://atmb-team-c26e0b650c4d16117551675.freshchat.com',
      'https://maps.googleapis.com',
      'https://www.youtube.com/',
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
