export default function WhyBusinessesChooseUs() {
  return (
    <section className="bg-[#F2F5F7] py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center max-w-7xl mx-auto mb-12">
        <h3 className="text-md font-bold text-[#525252] tracking-wide">
          "Why Businesses Choose Us"
        </h3>
        <p className="text-xl md:text-2xl text-[#171717] mt-4">
          Trusted by entrepreneurs, digital nomads, and small businesses worldwide for <br />
          reliability, flexibility, and growth support.
        </p>
      </div>

      <div className="grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 items-center">
        {/* Left side image placeholder */}
        <div className="w-[430px] h-[390px] bg-[#C6CBCE] rounded-2xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7l9 9m0 0l9-9m-9 9V3"
            />
          </svg>
        </div>

        {/* Right side content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="font-semibold text-md text-[#171717]">All-in-One Platform</h3>
            <p className="text-[#525252] text-sm mt-2">
              Manage mail, calls, and growth tools from one dashboard — no juggling multiple providers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-md text-[#171717]">Global Accessibility</h3>
            <p className="text-[#525252] text-sm mt-3">
              Access services from anywhere in the world with a secure online portal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-md text-[#171717]">Professional Image</h3>
            <p className="text-[#525252] text-sm mt-2">
              Give clients and partners a polished, credible first impression.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-md text-[#171717]">Scalable for Your Needs</h3>
            <p className="text-[#525252] text-sm mt-2">
              Start with essentials and upgrade anytime as your business grows.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-md text-[#171717]">Cost-Effective Solutions</h3>
            <p className="text-[#525252] text-sm mt-2">
              Save more with bundles and avoid the overhead of physical offices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-md text-[#171717]">Dedicated Support</h3>
            <p className="text-[#525252] text-sm mt-2">
              Our customer team knows remote business challenges and helps you succeed faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
