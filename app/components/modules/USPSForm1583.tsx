
import {PortableText} from '@portabletext/react';
 
type Props = {
  module: any;
};
 
const getPlainText = (portableText: any): string | null => {
  if (!portableText || !Array.isArray(portableText) || portableText.length === 0) {
    return null;
  }
  const firstBlock = portableText[0];
  if (firstBlock._type !== 'block' || !firstBlock.children) {
    return null;
  }
  
  return firstBlock.children
    .map((span: any) => span.text)
    .join('');
};
 
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
      {guideModule && <GuideModule module={guideModule} />}
 
      <div className="container mx-auto flex flex-col gap-8 px-4 py-12 md:flex-row md:px-8 lg:gap-12">
        <main className="md:w-2/3">
          {contentModule && <ContentModule module={contentModule} />}
        </main>
 
        <aside className="top-24 h-full md:sticky md:w-1/3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">In This Guide</h3>
            
            {contentModule?.contentBlocks?.length > 0 ? (
              <nav>
                <ul className="space-y-3">
                  {contentModule.contentBlocks.map((block: any, index: number) => {
                    const blockTitle = getPlainText(block.textField);
                    return (
                      <li key={block._key || index}>
                        <a
                          href={`#block-${index}`}
                          className="block text-sm text-orange-500 transition-colors duration-200"
                        >
                          <div className="">
                            <span className="font-medium">
                              {blockTitle || `Section ${index + 1}`}
                            </span>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : (
              <p className="text-sm text-gray-600">
                No sections available
              </p>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
 
function GuideModule({module}: {module: any}) {
  return (
    <section className="guide-module overflow-hidden bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center md:flex-row md:text-left lg:gap-12">
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
 
function ContentModule({module}: {module: any}) {
  return (
    <div className="content-module rounded-lg border bg-white p-6 shadow-sm sm:p-8">
      {module.contentBlocks?.map((block: any, index: number) => (
        <div key={block._key || index} id={`block-${index}`}>
          <ContentBlock block={block} />
          {index < module.contentBlocks.length - 1 && (
            <hr className="my-12 border-slate-200" />
          )}
        </div>
      ))}
    </div>
  );
}
 
function ContentBlock({block}: {block: any}) {
  return (
    <div className="content-block">
      {block.textField && (
        <div className="mb-6 prose prose-xl max-w-none prose-slate">
          <PortableText value={block.textField} />
        </div>
      )}
 
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
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          )}
          {block.rightImage?.asset?.url && (
            <div className="flex-1 min-w-[200px]">
              <img
                src={block.rightImage.asset.url}
                alt={block.rightImage.alt || ''}
                loading="lazy"
                className="rounded-xl shadow-lg w-full h-auto"
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
            className="rounded-xl shadow-lg w-full h-auto"
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
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
      )}
 
      {block.textField5 && (
        <p className="my-6 text-lg text-slate-600">{block.textField5}</p>
      )}
 
      {block.extraContent && (
        <div className="prose prose-lg max-w-none prose-slate my-6">
          <PortableText value={block.extraContent} />
        </div>
      )}
 
      {block.image4?.asset?.url && (
        <div className="my-8">
          <img
            src={block.image4.asset.url}
            alt={block.image4.alt || ''}
            loading="lazy"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>
      )}
 
      {block.textField6 && (
        <p className="my-6 text-lg text-slate-600">{block.textField6}</p>
      )}
 
      {block.extraContent2 && (
        <div className="prose prose-lg max-w-none prose-slate my-6">
          <PortableText value={block.extraContent2} />
        </div>
      )}
    </div>
  );
}
 
 
