import RightArrowWhite from '~/components/icons/RightArrowWhite';
interface InviteFriendProps {
  data: {
    _key?: string;
    _type?: string;
    sectionTitle?: string;
    heading?: string;
    description?: string;
    mainImage?: {
      alt?: string;
      url?: string;
    };
    cta?: {
      label?: string;
      url?: string | null;
    };
  };
}
 
export function InviteFriend({ data }: InviteFriendProps) {
  const {
    sectionTitle,
    heading,
    description,
    mainImage,
    cta,
  } = data || {};
 
  // ✅ Map variables to your existing JSX names
  const label = sectionTitle;
  const buttonText = cta?.label;
  const buttonLink = cta?.url;
  const image = mainImage;
 
  const renderHeading = () => {
    if (!heading) return null;
    return heading;
  };
 
  return (
    <section className="px-5 py-[40px] md:py-[54px] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[44px] md:gap-[62px] lg:gap-[126px] items-center">
          <div className="w-full md:w-[45.15%]">
            {label && (
              <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                {label}
              </span>
            )}
 
            {heading && (
              <h1 className="mt-4 md:mt-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">
                {renderHeading()}
              </h1>
            )}
 
            {description && (
              <p className="mt-4 font-Roboto text-PrimaryBlack font-normal md:font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                {description}
              </p>
            )}
 
            {buttonText && (
              <a
                href={buttonLink || '#'}
                className="group relative mt-6 flex items-center justify-center w-full md:w-[259px] h-[52px] md:h-[52px] rounded-full bg-DarkOrange px-4 py-3 text-white font-Roboto font-medium text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px] overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DF5D07]"
              >
              <span className="relative flex items-center">{buttonText} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
              </a>
            )}
          </div>
 
          {image?.url && (
            <div className="w-full md:w-[54.85%] relative">
              <img
                src={image.url}
                alt={image.alt || heading || 'Invite a friend'}
                className="rounded-[20px] w-full max-h-[400px] object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}