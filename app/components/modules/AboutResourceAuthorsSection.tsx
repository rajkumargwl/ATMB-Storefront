import { Link } from "@remix-run/react";

interface Author {
  _key: string;
  name: string;
  role: string;
  image?: {
    url: string;
  };
}

interface AboutResourceAuthorsSectionProps {
  title: string;
  subtitle?: string;
  authors: Author[];
}

export default function AboutResourceAuthorsSection({
  title,
  subtitle,
  authors,
}: AboutResourceAuthorsSectionProps) {
  if (!authors || authors.length === 0) return null;

  // Helper to create slug from author name
  const createSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div>
          <div className="max-w-[870px] mx-auto pb-[44px] md:pb-[64px] flex flex-col items-center justify-center gap-4 md:gap-5">
            {/* Section Title */}
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px] text-center">
              {title}
            </h2>
            {subtitle && (
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
                {subtitle}
              </p>
            )}
          </div>

          {/* Authors Grid */}
          <div className="flex gap-6 overflow-x-auto lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible scrollbar-hide">
            {authors.map((author) => {
              const slug = createSlug(author.name);
              return (
                <div
                  key={author._key || author.name}
                  className="flex flex-col items-center transition-all min-w-[228px] lg:min-w-0"
                >
                  <Link
                    to={`/blog-author/${slug}`}
                    prefetch="intent"
                    className="flex flex-col items-center group outline-none focus-visible:outline-none"
                  >
                    {/* Author Image */}
                    {author.image?.url && (
                      <div
                        className="flex rounded-full overflow-hidden border-2 border-transparent transition-all 
                                   group-hover:border-DarkOrange 
                                   group-focus-visible:border-DarkOrange"
                      >
                        <img
                          src={author.image.url}
                          alt={author.name}
                          className="rounded-full w-[150px] h-[150px] object-cover transform transition-transform duration-300 scale-102"
                        />
                      </div>
                    )}

                    {/* Author Content */}
                    <h3
                      className="mt-5 md:mt-6 font-Roboto text-PrimaryBlack font-semibold text-[20px] leading-[28px] tracking-[-0.3px] 
                                 transition-all group-hover:text-DarkOrange group-focus-visible:text-DarkOrange"
                    >
                      {author.name}
                    </h3>
                  </Link>

                  <p className="mt-2 font-Roboto text-PrimaryBlack font-normal text-[16px] leading-[24px] tracking-[0px] ">
                    {author.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
