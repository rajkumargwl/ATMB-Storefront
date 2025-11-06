import {PortableText} from '@portabletext/react';
import { useEffect } from 'react';

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

  // Handle table of contents clicks with immediate scroll
  useEffect(() => {
    const handleTableClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash) {
        e.preventDefault();
        e.stopPropagation();
        
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          // Immediate scroll without any delay
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Force browser to update URL without navigation
          if (history.pushState) {
            history.pushState(null, '', link.hash);
          } else {
            window.location.hash = link.hash;
          }
        }
      }
    };

    const tableOfContents = document.querySelector('aside');
    if (tableOfContents) {
      tableOfContents.addEventListener('click', handleTableClick);
    }

    return () => {
      if (tableOfContents) {
        tableOfContents.removeEventListener('click', handleTableClick);
      }
    };
  }, [contentModule?.contentBlocks]);

  return (
    <>
      {guideModule && <GuideModule module={guideModule} />}
<section className="px-5 py-[40px] md:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[24px] md:gap-[24px]">
         <main className="w-full md:w-[70.5%] border border-LightWhite rounded-[12px] order-2 md:order-1 main-content-left">
          {contentModule && <ContentModule module={contentModule} />}
        </main>

        <aside className="w-full md:w-[29.5%] md:sticky md:top-0 h-fit z-10 order-1 md:order-2">
          <div className="p-6 md:py-[40px] md:px-8 rounded-[12px] bg-[#F6F6F6]">
            <h3 className="mb-4 font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">Content</h3>
            
            {contentModule?.contentBlocks?.length > 0 ? (
              <nav>
                <ul className="space-y-4  font-Roboto text-DarkOrange font-medium text-[18px] leading-[27px] tracking-[0px]">
                  {contentModule.contentBlocks.map((block: any, index: number) => {
                    const blockTitle = getPlainText(block.textField);
                    return (
                      <li key={block._key || index} className='pl-5 indent-[-20px]'>
                      <a
  href={`#block-${index}`}
  className="font-Roboto text-DarkOrange font-medium text-[18px] leading-[27px] tracking-[0px]" // ← Original class without cursor-pointer
  onClick={(e) => {
    e.preventDefault();
    const element = document.getElementById(`block-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.pushState) {
        history.pushState(null, '', `#block-${index}`);
      }
    }
  }}
>
                          <div className="">
                            <span className="font-Roboto text-DarkOrange font-medium text-[18px] leading-[27px] tracking-[0px]">
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
      </section>
    </>
  );
}

function GuideModule({module}: {module: any}) {
  return (
    <section className="px-5 py-[40px] md:py-[54px] bg-[#F6F6F6]">
       <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[62px] items-center ">
         <div className="w-full md:w-[48%] space-y-4 md:space-y-5">
           <h1 className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
            {module.title}
          </h1>
          {module.description && (
            <p className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {module.description}
            </p>
          )}
        </div>
        {module.image?.asset?.url && (
          <div className="w-full md:w-[52%] relative">
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
        <div className="my-6 md:my-[30px] flex flex-wrap gap-6 md:gap-[136px]">
          {block.leftImage?.asset?.url && (
            <div className="flex-1 min-w-[200px]">
            
              <img
                src={block.leftImage.asset.url}
                alt={block.leftImage.alt || ''}
                loading="lazy"
                className=" w-full h-auto"
              />
            </div>
          )}
          {block.rightImage?.asset?.url && (
            <div className="flex-1 min-w-[200px]">
               
              <img
                src={block.rightImage.asset.url}
                alt={block.rightImage.alt || ''}
                loading="lazy"
                className="rounded-[12px] w-full h-auto"
              />
            </div>
          )}
        </div>
      )}

      {block.textField1 && (
        <p className="my-6 text-lg text-slate-600">{block.textField1}</p>
      )}

      {block.image2?.asset?.url && (
        <div className="my-6 md:my-[30px]">
          <img
            src={block.image2.asset.url}
            alt={block.image2.alt || ''}
            loading="lazy"
            className="rounded-[12px] w-full h-auto"
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
        <div className="my-6 md:my-[30px]">
          <img
            src={block.image3.asset.url}
            alt={block.image3.alt || ''}
            loading="lazy"
            className="rounded-[12px] w-full h-auto"
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
        <div className="my-6 md:my-[30px]">
          <img
            src={block.image4.asset.url}
            alt={block.image4.alt || ''}
            loading="lazy"
            className="rounded-[12px] w-full h-auto"
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