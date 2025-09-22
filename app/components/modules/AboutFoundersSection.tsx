import { Link } from "@remix-run/react";

interface Founder {
  _key: string;
  name: string;
  role: string;
  bio: string;
  image?: {
    url: string;
  };
  linkedin?: string;
}

interface AboutFoundersSectionProps {
  title: string;
  subtitle?: string;
  founders: Founder[];
}

export default function AboutFoundersSection({
  title,
  subtitle,
  founders,
}: AboutFoundersSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-black">{subtitle}</p>
          )}
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder) => (
            <div
              key={founder._key || founder.name}
              className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 hover:shadow-2xl transition"
            >
              {/* Founder Image */}
              {founder.image?.url && (
                <div className="flex-shrink-0 w-36 h-36 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={founder.image.url}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Founder Content */}
              <div>
                <h3 className="text-2xl font-semibold text-black">
                  {founder.name}
                </h3>
                <p className="text-black mb-3">{founder.role}</p>
                <p className="text-black leading-relaxed">{founder.bio}</p>

                {founder.linkedin && (
                  <Link
                    to={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition"
                  >
                    {/* LinkedIn Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 
                      5v14c0 2.76 2.24 5 5 5h14c2.76 
                      0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 
                      20h-3v-11h3v11zm-1.5-12.25c-.97 
                      0-1.75-.79-1.75-1.75s.78-1.75 
                      1.75-1.75 1.75.79 
                      1.75 1.75-.78 1.75-1.75 
                      1.75zm13.25 12.25h-3v-5.5c0-1.1-.9-2-2-2s-2 
                      .9-2 2v5.5h-3v-11h3v1.56c.69-.9 
                      1.77-1.56 3-1.56 2.21 
                      0 4 1.79 4 4v7z" />
                    </svg>
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
