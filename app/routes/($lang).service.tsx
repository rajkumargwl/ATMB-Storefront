// app/routes/($lang).service.tsx
import {json} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useEffect, useRef, useState} from 'react';

// --- Required loader to avoid GET error ---
export async function loader({request, params}: LoaderFunctionArgs) {
  return json({});
}

// --- Main Page Component with iframe ---
export default function ServicePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) {
          setIframeBlocked(true);
        }
      } catch (err) {
        // CORS or frame restriction error
        setIframeBlocked(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Mailbox</h1>

      <div className="border rounded overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://rewoundtakeback.timex.com/"
          width="100%"
          height="600"
          className="w-full border"
          onError={() => setIframeBlocked(true)}
        />
      </div>
      {iframeBlocked && (
        <div className="mt-4 text-center text-red-600">
          ⚠️ Unable to display mailbox inside this site.
          <br />
          <a
            href="https://rewoundtakeback.timex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Click here to open in a new tab
          </a>
        </div>
      )}
    </div>
  );
}
