import type { LoaderFunctionArgs } from '@shopify/remix-oxygen'
import { json } from '@shopify/remix-oxygen'
import groq from 'groq'
import { useLoaderData } from '@remix-run/react'; 
import type {SamplePage} from '~/lib/sanity';
import { SAMPLE_PAGE } from '~/queries/sanity/fragments/sample'

export async function loader({ request, context, params }: LoaderFunctionArgs) {


const page = await context.sanity.query<SamplePage>({
   query: groq`*[_type == "sample"][0]{
    ${SAMPLE_PAGE}
  }`
  });
  console.log("page",page);



  return json({ sample: page })
}

export default function SamplePage() {
  const { sample } = useLoaderData<typeof loader>()

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{sample.title}</h1>
      <p className="mb-6">{sample.description}</p>
      {sample.image?.asset?.url && (
        <img
          src={sample.image.asset.url}
          alt={sample.image.alt || ''}
          className="rounded shadow-lg"
        />
      )}
    </main>
  )
}
