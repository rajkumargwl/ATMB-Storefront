import {
  type ActionFunctionArgs,
  type ActionFunction,
  type AppLoadContext,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';

export async function doLogout(context: AppLoadContext) {
  const {session, cart} = context;
  session.unset('customerAccessToken');

  const localeCountry = context?.storefront?.i18n?.country;

  // Remove customerAccessToken frpm existing cart
  const result = await cart.updateBuyerIdentity({
    customerAccessToken: null,
    countryCode: localeCountry,
  });

  // Update cart id in cookie
  const headers = cart.setCartId(result.cart.id);

  headers.append('Set-Cookie', await session.commit());

  // return redirect(`${context.storefront.i18n.pathPrefix}/`, {
  //   headers,
  // });
  
  // Redirect to Microsoft logout endpoint
  const tenant = context.env.MS_ENTRA_TENANT_ID; // or your tenant ID
  // const postLogoutRedirectUri = "https://shopifystage.anytimehq.co/";
  const postLogoutRedirectUri = context.env.STORE_DOMAIN || 'https://shopifystage.anytimehq.co/';
  const logoutUrl = `https://login.anytimehq.co/${tenant}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;

  return redirect(logoutUrl, { headers });
}

export async function loader({context}: LoaderFunctionArgs) {
  return redirect(context.storefront.i18n.pathPrefix);
}

export const action: ActionFunction = async ({context}: ActionFunctionArgs) => {
  return doLogout(context);
};
