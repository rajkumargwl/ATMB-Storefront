import { useState } from "react";
import { Link } from "@remix-run/react";
import type { SANITY_MARKETPLACE_CATEGORIES } from "~/lib/sanity";
import NewTabIcon from "~/components/icons/NewTabIcon";
import ArrowDownIcon from '~/components/icons/ArrowDownIcon';
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

type Props = {
  data: SANITY_MARKETPLACE_CATEGORIES;
};

export default function MarketplaceIntro({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<number>(-1); 
  // -1 means "All"

  // merge all subcategories when activeCategory = -1
  const allSubcategories =
    data?.categories?.flatMap((cat) =>
      cat.subcategories?.map((sub) => ({
        ...sub,
        parentTitle: cat.title,
        parentImage: cat.image,
      }))
    ) || [];

  const currentCategory =
    activeCategory === -1 ? null : data?.categories?.[activeCategory];

  const subcategories =
    activeCategory === -1
      ? allSubcategories
      : currentCategory?.subcategories || [];

    const allSubcategoriesCount =
    data?.categories
    ?.filter((cat) => cat.subcategories && cat.subcategories.length > 0)
    ?.reduce((acc, cat) => acc + cat.subcategories!.length, 0) || 0;

    console.log("marketplace categories:", data);

  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        {/* <aside className="w-full lg:w-[280px]">
          <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
            <li
              onClick={() => setActiveCategory(-1)}
              className={`flex items-center gap-4 p-[18px] cursor-pointer transition-all text-[16px] leading-[24px] font-[400] ${
                activeCategory === -1
                  ? "bg-PrimaryBlack font-semibold text-[#FFFFFF]"
                  : "text-[#091019] bg-[#F6F6F6]"
              }`}
            >
              {data?.allIcon?.url && (
                  <img
                  src={
                    activeCategory === -1
                      ? data?.allIcon?.url   
                      : data?.allIconBlack?.url        
                  }
                    alt="All Categories"
                    className="w-8 h-8 object-contain"
                  />
                )}
                <span>All ({allSubcategoriesCount.toString().padStart(2, "0")})</span>
            </li>

            {data?.categories?.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-4 p-[18px] cursor-pointer transition-all text-[16px] leading-[24px] font-[400] border-b border-[#DCDCDC] ${
                  activeCategory === idx
                    ? "bg-PrimaryBlack font-semibold text-[#FFFFFF]"
                    : "text-[#091019] bg-[#F6F6F6]"
                }`}
              >
                {activeCategory === idx ? (
                  cat?.iconWhite && (
                    <span
                      dangerouslySetInnerHTML={{ __html: cat.iconWhite }}
                    />
                  )
                ) : (
                  cat?.iconBlack && (
                    <span
                      dangerouslySetInnerHTML={{ __html: cat.iconBlack }}
                    />
                  )
                )}


                <span>{cat?.title}
                {cat?.subcategories && (
                  <>
                     &nbsp;({cat.subcategories.length.toString().padStart(2, "0")})
                  </>
                )}
                </span>
              </li>
            ))}
          </ul>
        </aside> */}
        <aside className="w-full lg:w-[280px]">
  {/* Mobile Dropdown */}
  <div className="lg:hidden mb-4 relative">
  {/** Build dropdown categories array including "All" */}
  {(() => {
    const dropdownCategories = [
      {
        value: -1,
        title: `All (${allSubcategoriesCount.toString().padStart(2, "0")})`,
        icon: data?.allIconBlack,
      },
      ...(data?.categories?.map((cat, idx) => ({
        value: idx,
        title: `${cat.title}${
          cat.subcategories
            ? ` (${cat.subcategories.length.toString().padStart(2, "0")})`
            : ""
        }`,
        icon: cat.iconBlack,
      })) || []),
    ];

    const selectedCategory =
      dropdownCategories.find((c) => c.value === activeCategory) ||
      dropdownCategories[0];

    return (
      <Listbox value={activeCategory} onChange={setActiveCategory}>
        <Listbox.Button className="w-full flex items-center justify-between border border-[#DCDCDC] text-[#091019] rounded-[12px] px-4 py-3 bg-white text-[16px] leading-[24px]">
          <div className="flex items-center gap-3">
            {selectedCategory?.icon && (
              <span
                dangerouslySetInnerHTML={{ __html: selectedCategory.icon }}
              />
            )}
            <span>{selectedCategory?.title}</span>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {dropdownCategories.map((cat) => (
            <Listbox.Option
              key={cat.value}
              value={cat.value}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100"
            >
              {cat.icon && (
                <span
                  dangerouslySetInnerHTML={{ __html: cat.icon }}
                />
              )}
              <span>{cat.title}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  })()}
</div>


  {/* Desktop Sidebar */}
  <ul className="hidden lg:flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
    {/* All Tab */}
    <li
      onClick={() => setActiveCategory(-1)}
      className={`flex items-center gap-4 p-[18px] cursor-pointer transition-all text-[16px] leading-[24px] font-[400] ${
        activeCategory === -1
          ? "bg-PrimaryBlack font-semibold text-[#FFFFFF]"
          : "text-[#091019] bg-[#F6F6F6]"
      }`}
    >
      {activeCategory === -1 ? (
        <span dangerouslySetInnerHTML={{ __html: data?.allIconWhite}} />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: data?.allIconBlack}} />
      )}
      <span>All ({allSubcategoriesCount.toString().padStart(2, "0")})</span>
    </li>

    {/* Category Tabs */}
    {data?.categories?.map((cat, idx) => (
      <li
        key={idx}
        onClick={() => setActiveCategory(idx)}
        className={`flex items-center gap-4 p-[18px] cursor-pointer transition-all text-[16px] leading-[24px] font-[400] border-b border-[#DCDCDC] ${
          activeCategory === idx
            ? "bg-PrimaryBlack font-semibold text-[#FFFFFF]"
            : "text-[#091019] bg-[#F6F6F6]"
        }`}
      >
        {activeCategory === idx ? (
          cat?.iconWhite && (
            <span dangerouslySetInnerHTML={{ __html: cat.iconWhite }} />
          )
        ) : (
          cat?.iconBlack && (
            <span dangerouslySetInnerHTML={{ __html: cat.iconBlack }} />
          )
        )}

        <span>
          {cat?.title}
          {cat?.subcategories && (
            <>
              &nbsp;({cat.subcategories.length.toString().padStart(2, "0")})
            </>
          )}
        </span>
      </li>
    ))}
  </ul>
</aside>


        {/* Content */}
        <div className="flex-1 border border-[#DCDCDC] rounded-[24px]">
          {currentCategory?.image?.url && activeCategory !== -1 && (
            <div className="rounded-t-lg overflow-hidden">
              <img
                src={currentCategory.image.url}
                alt={currentCategory.image.alt || ""}
                className="w-full h-[300px] object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title */}
            <h3 className="text-[32px] font-[600] leading-[38.4px] tracking-[-0.48px] text-PrimaryBlack mb-6">
              {activeCategory === -1 ? "All Categories" : currentCategory?.title}
            </h3>

            {subcategories?.length > 0 && (
              <div className="space-y-6">
                {subcategories
                  .filter((sub) => sub && Object.keys(sub).length > 0)
                  .map((sub, i, arr) => (
                    <div
                      key={i}
                      className={`pb-6 ${
                        i < arr.length - 1 ? "border-b border-[#DCDCDC]" : ""
                      }`}
                    >
                      {/* Row: Image Left & Link Right */}
                      <div className="flex items-center justify-between">
                        {sub?.logo?.url && (
                          <img
                            src={sub?.logo?.url}
                            alt={sub?.logo?.alt || sub?.name}
                            className="h-[28px] object-contain"
                          />
                        )}

                        {/* {sub?.buttonText && ( */}
                          <Link
                            to={sub?.buttonLink || "#"}
                            target="_blank"
                            className="flex items-center gap-1 text-[16px] leading-[16px] text-[#091019] cursor-pointer border border-[#091019] rounded-full px-4 py-3"
                          >
                            {sub?.buttonText || "Learn More"}
                            <NewTabIcon className="w-4 h-4" />
                          </Link>
                        {/* )} */}
                      </div>

                      {/* Description in new line */}
                      {sub?.description && (
                        <p className="text-[#091019] leading-[21px] text-[14px] font-[400] mt-5">
                          {sub?.description}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
