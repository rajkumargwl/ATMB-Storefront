import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import LocationsList, {LocationAPI} from '~/components/location/LocationList';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound, validateLocale} from '~/lib/utils';
  import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
  const seo: SeoHandleFunction = ({data}) => ({
   title: data?.page?.seo?.title || 'Mailbox Locations | Anytime Mailbox',
   description:
     data?.page?.seo?.description ||
     'Choose the most practical location for your virtual business address. Customers will easily find your business and you will make a good first impression.',
});
export const handle = { seo };
export async function loader({context, request, params}: LoaderFunctionArgs) {
  validateLocale({ context, params });
   let language = params.lang || 'en';
   if(language !== 'en-es'){
     language = 'en';
   }
 
  const cache = context.storefront.CacheCustom({mode: 'public', maxAge: 60, staleWhileRevalidate: 60});
 
  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY,params: { language }, cache}),
    context.sanity.query({query: FOOTER_QUERY,params: { language }, cache}),
  ]);
 
  if (!header || !footer) throw notFound();
 
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  console.log("Search query:", q);
 
  let results = {locations: [] as LocationAPI[]};
 
  if (q) {
    console.log("Performing search for query:", q);
    const searchParam = `${q}*`;
    try {
      results = await context.sanity.query({
        query: `{
          "locations": *[_type == "location" && (
             displayName match $search ||
             city match $search ||
             postalCode match $search
           )]{
        _id,
        locationId,
        displayName,
        country,
        countryCode,
        state,
        stateCode,
        city,
        addressLine1,
        addressLine2,
        postalCode,
        coordinates,
        "latitude": coordinates.lat,
        "longitude": coordinates.lng,
        webkey,
        planList,
        createdAt,
 
        featureList[]{
          "feature_id": feature.feature_id,
          "label": feature.label,
          "description": feature.description,
          "category": feature.category,
          "class": feature.class,
          "status": feature.status,
          "type": feature.type,
          sort_order,
          status,
          type
        },
 
        ratingList[]{
          rating_id,
          value,
          sort_order,
          status,
          type
        },
 
        attributeList[]{
          attribute_id,
          name,
          value,
          sort_order,
          status,
          type
        },
 
        calendarList[]{
          calendar_id,
          calendar_item_id,
          day_of_the_week,
          item_date,
          label,
          time_begin,
          time_end,
          type
        }
        }
        }`,
        params: {search: searchParam},
      });
    } catch (error) {
      console.error('Sanity query failed:', error);
    }
  }
  else {
    const locations: LocationAPI[] = await context.sanity.query({
query: `*[_type == "location"][0...50]{
        _id,
        locationId,
        displayName,
        country,
        countryCode,
        state,
        stateCode,
        city,
        addressLine1,
        addressLine2,
        postalCode,
        coordinates,
        "latitude": coordinates.lat,
        "longitude": coordinates.lng,
        webkey,
        planList,
        createdAt,
 
        featureList[]{
          "feature_id": feature.feature_id,
          "label": feature.label,
          "description": feature.description,
          "category": feature.category,
          "class": feature.class,
          "status": feature.status,
          "type": feature.type,
          sort_order,
          status,
          type
        },
 
        ratingList[]{
          rating_id,
          value,
          sort_order,
          status,
          type
        },
 
        attributeList[]{
          attribute_id,
          name,
          value,
          sort_order,
          status,
          type
        },
 
        calendarList[]{
          calendar_id,
          calendar_item_id,
          day_of_the_week,
          item_date,
          label,
          time_begin,
          time_end,
          type
        }
      }`,
    });
 
    results.locations = locations;
  }
 
  return defer({locations:results.locations, header, footer, q});
}
 
export default function LocationsPage() {
  const {locations, q} = useLoaderData<typeof loader>();
  //console.log("Locations data:", locations);
  return <LocationsList locations={locations} initialQuery={q} isCityPage={false} country="" />;
}
 