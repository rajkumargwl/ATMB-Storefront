import { LoaderFunctionArgs } from "@shopify/remix-oxygen";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  return new Response(
    `
      <script>
        (function() {
          const token = ${JSON.stringify(token)};
          if (window.opener) {
            // Post token back to parent window
            window.opener.postMessage({ token }, "https://shopifystage.anytimehq.co");
            window.close();
          } else {
            // Fallback: if no parent, redirect directly
            window.location.href = "/account/login?token=" + token;
          }
        })();
      </script>
    `,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
