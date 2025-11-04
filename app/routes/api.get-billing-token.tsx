//this route fetches a billing token from an external billing service
export async function getBillingToken(env: any) {
    const billingConfig = {
      baseUrl: env.BILLING_ANYTIME_BASE_URL,
      subscriptionKey: env.BILLING_ANYTIME_SUBSCRIPTION_KEY,
      clientId: env.BILLING_ANYTIME_CLIENT_ID,
      clientSecret: env.BILLING_ANYTIME_CLIENT_SECRET,
      scope: env.BILLING_ANYTIME_SCOPE,
    };
  
    const response = await fetch(`${billingConfig.baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Api-Version": "v1",
        "Api-Environment": "dev",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": billingConfig.subscriptionKey,
      },
      body: JSON.stringify({
        clientId: billingConfig.clientId,
        clientSecret: billingConfig.clientSecret,
        scope: billingConfig.scope,
        grantType: "client_credentials",
      }),
    });
  
    const tokenData = await response.json();
  
    if (!response.ok || !tokenData?.data?.accessToken) {
      throw new Error("Failed to fetch token");
    }
  
    return tokenData.data.accessToken;
  }
  