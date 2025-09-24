// app/components/modules/USPSForm1583.tsx

import {PortableText} from '@portabletext/react';

type Props = {
  module: any;
};

// This main component is already correct and sets up the main content (left) and sidebar (right)
export default function USPSForm1583Module({module}: Props) {
  if (!module?.subModules) return null;

  const guideModule = module.subModules.find(
    (mod: any) => mod._type === 'uspsForm1583Guide',
  );
  const contentModule = module.subModules.find(
    (mod: any) => mod._type === 'uspsForm1583Content',
  );

  return (
    <>
      {/* Render the Guide Module first, full-width */}
      {guideModule && <GuideModule module={guideModule} />}

      {/* Then, render the main content area */}
      <div className="container mx-auto flex flex-col gap-8 px-4 py-12 md:flex-row md:px-8 lg:gap-12">
        {/* Left Column (Main Content) */}
        <main className="md:w-2/3">
          {contentModule && <ContentModule module={contentModule} />}
        </main>

        {/* Right Column (Sidebar) */}
        <aside className="top-24 h-full md:sticky md:w-1/3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-bold">In This Guide</h3>
            <p className="text-sm text-gray-600">
              (A table of contents could be generated here)
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

// --- Sub-Components ---

function GuideModule({module}: {module: any}) {
  return (
    <section className="guide-module overflow-hidden bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center md:flex-row md:text-left lg:gap-12">
        {/* Column 1: Text Content */}
        <div className="md:w-1/2">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {module.title}
          </h1>
          {module.description && (
            <p className="mb-10 text-lg text-slate-600 sm:text-xl">
              {module.description}
            </p>
          )}
        </div>

        {/* Column 2: Image */}
        {module.image?.asset?.url && (
          <div className="md:w-1/2">
            <img
              src={module.image.asset.url}
              alt={module.image.alt || module.title}
              width={module.image.asset.metadata.dimensions.width}
              height={module.image.asset.metadata.dimensions.height}
              loading="lazy"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// DESIGN CHANGE: Added a divider between content blocks
function ContentModule({module}: {module: any}) {
  return (
    <div className="content-module rounded-lg border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 border-b pb-4 text-3xl font-bold text-slate-900">
        {module.title}
      </h2>

      {module.contentBlocks?.map((block: any, index: number) => (
        // Using a div as a wrapper for each block and its divider
        <div key={block._key}>
          <ContentBlock block={block} />

          {/* Logic to add a border after each block EXCEPT the last one */}
          {index < module.contentBlocks.length - 1 && (
            <hr className="my-12 border-slate-200" />
          )}
        </div>
      ))}
    </div>
  );
}

// (No changes needed to the component below)
function ContentBlock({block}: {block: any}) {
  return (
    <div className="content-block">
      {block.mainContent && (
        <div className="prose prose-lg max-w-none prose-slate">
          <PortableText value={block.mainContent} />
        </div>
      )}

      {(block.leftImage?.asset?.url || block.rightImage?.asset?.url) && (
        <div className="my-8 flex flex-wrap gap-6">
          {block.leftImage?.asset?.url && (
            <div className="flex-1 min-w-[200px]">
              <img
                src={block.leftImage.asset.url}
                alt={block.leftImage.alt || ''}
                loading="lazy"
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
          {block.rightImage?.asset?.url && (
            <div className="flex-1 min-w-[200px]">
              <img
                src={block.rightImage.asset.url}
                alt={block.rightImage.alt || ''}
                loading="lazy"
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      )}

      {block.textField1 && (
        <p className="my-6 text-lg text-slate-600">{block.textField1}</p>
      )}

      {block.image2?.asset?.url && (
        <div className="my-8">
          <img
            src={block.image2.asset.url}
            alt={block.image2.alt || ''}
            loading="lazy"
            className="rounded-xl shadow-lg"
          />
        </div>
      )}

      {block.textField2 && (
        <p className="my-6 text-lg text-slate-600">{block.textField2}</p>
      )}
      {block.textField4 && (
        <p className="my-6 text-lg text-slate-600">{block.textField4}</p>
      )}

      {block.image3?.asset?.url && (
        <div className="my-8">
          <img
            src={block.image3.asset.url}
            alt={block.image3.alt || ''}
            loading="lazy"
            className="rounded-xl shadow-lg"
          />
        </div>
      )}

      {block.textField5 && (
        <p className="my-6 text-lg text-slate-600">{block.textField5}</p>
      )}

      {block.extraContent && (
        <div className="prose prose-lg max-w-none prose-slate">
          <PortableText value={block.extraContent} />
        </div>
      )}

      {block.image4?.asset?.url && (
        <div className="my-8">
          <img
            src={block.image4.asset.url}
            alt={block.image4.alt || ''}
            loading="lazy"
            className="rounded-xl shadow-lg"
          />
        </div>
      )}

      {block.textField6 && (
        <p className="my-6 text-lg text-slate-600">{block.textField6}</p>
      )}

      {block.extraContent2 && (
        <div className="prose prose-lg max-w-none prose-slate">
          <PortableText value={block.extraContent2} />
        </div>
      )}
    </div>
  );
}