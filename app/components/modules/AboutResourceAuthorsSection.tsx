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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Authors Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {authors.map((author) => (
            <div
              key={author._key || author.name}
              className="flex flex-col items-center text-center"
            >
              {/* Author Image */}
              {author.image?.url && (
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-gray-100">
                  <img
                    src={author.image.url}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Author Content */}
              <h3 className="mt-4 font-semibold text-gray-900 text-lg">
                {author.name}
              </h3>
              <p className="text-gray-600 text-sm">{author.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
