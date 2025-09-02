
import type {SanityTestimonial} from '~/lib/sanity';

type Props = {
  data: SanityTestimonial;
};

export default function Testimonials({ data }: Props) {
  return (
    <section className="py-16 bg-[#F2F5F7]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-sm font-bold text-gray-500">
          {data?.headline || "Thousand trust Anytime Mailbox"}
        </h3>
        <p className="text-2xl md:text-2xl text-gray-900 mt-2">
        {data?.subheadline || "See What Our Customers Are Saying"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data?.testimonials?.map((item, idx) =>
            item.type === "quote" ? (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex space-x-1 mb-3">
                    {Array.from({ length: item.rating }).map((_, i) => (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-4 h-4 text-yellow-400"
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    ))}
                  </div>
                  <p className="text-[#374151] text-[18px] leading-[150%]">
                    {item.quote}
                  </p>
                </div>
               <div className="flex items-center mt-6">
                {item.authorImage && (
                  <img
                    src={item.authorImage?.url}
                    alt={item.authorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">{item.authorName}</p>
                  <p className="text-sm text-gray-500">{item.authorTitle}</p>
                </div>
              </div>
            ) : (
              <div
                key={idx}
                className="bg-[#C6CBCE] from-gray-200 to-gray-400 rounded-2xl flex flex-col justify-center items-center p-6 relative"
              >
                <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l4.5-2.5a.5.5 0 0 0 0-.814l-4.5-2.5z" />
                  </svg>
                </button>
                <div className="mt-6 text-center">
                  <p className="font-semibold text-gray-800">{item.authorName}</p>
                  <p className="text-sm text-gray-600">{item.authorTitle}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
