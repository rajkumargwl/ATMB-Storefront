
export default function BusinessAppSection() {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white mb-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-sm font-bold text-gray-500">
        Your Business at Your Fingertips — On Mobile and Desktop
        </h3>
        <p className="text-[30px] font-extralight text-[#1F2937] mt-2">
            Whether you're on a flight, at a café, or in your home office,
            our mobile app and desktop portal keep you connected, in control,
            and ready to act instantly.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mt-12">
        {/* Left Section - Illustration + Personas */}
        <div className="relative flex justify-center">
          <div className="w-60 h-96 bg-[#C6CBCE] rounded-xl flex items-center justify-center">
            <span className="text-gray-500">📱</span>
          </div>

          {/* Floating Cards */}
          <div className="absolute top-[106px] left-[37px] border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-52">
            <span className="text-2xl">👩🏻</span>
            <div>
              <p className="font-semibold text-[14px]">Digital Nomad</p>
              <p className="text-[10px] text-[#525252]">Take client calls from anywhere in the world</p>
            </div>
          </div>

          <div className="absolute top-6 right-[90px] border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-60">
            <span className="text-2xl">👨🏻</span>
            <div>
              <p className="font-semibold text-[14px]">Frequent Traveler</p>
              <p className="text-[10px] text-[#525252]">Handle mail while you're 30,000 feet in the air.</p>
            </div>
          </div>

          <div className="absolute bottom-10 left-[74px] border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-52">
            <span className="text-2xl">👨🏻‍💼</span>
            <div>
              <p className="font-semibold text-[14px]">Small Business Owner</p>
              <p className="text-[10px] text-[#525252]">Track your business health from your desk</p>
            </div>
          </div>

          <div className="absolute -bottom-6 right-[128px] border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-52">
            <span className="text-2xl">👩🏻‍💻</span>
            <div>
              <p className="font-semibold text-[14px]">Freelancer</p>
              <p className="text-[10px] text-[#525252]">Stay professional without renting office space.</p>
            </div>
          </div>
        </div>

        {/* Right Section - Text + Features */}
        <div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="max-w-28 w-28 h-13 bg-[#E5E5E5]"></div>
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">Complete Mail Management</h4>
                <p className="text-sm text-[#525252] mt-2">View, open, scan, forward, or shred incoming mail in seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="max-w-28 w-28 h-13 bg-[#E5E5E5]"></div>
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">Call & Message Control</h4>
                <p className="text-sm text-[#525252] mt-2">Answer calls, forward to team members, read voicemail transcriptions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="max-w-28 w-28 h-13 bg-[#E5E5E5]"></div>
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">Real-Time Notifications</h4>
                <p className="text-sm text-[#525252] mt-2">Instant alerts for new mail, calls, or accelerator updates.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="max-w-28 w-28 h-13 bg-[#E5E5E5]"></div>
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">Enterprise-Grade Security</h4>
                <p className="text-sm text-[#525252] mt-2">End-to-end encryption, secure login, role-based access for teams.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
            <div className="max-w-28 w-28 h-13 bg-[#E5E5E5]"></div>
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">Business Insights Dashboard</h4>
                <p className="text-sm text-[#525252] mt-2">Track usage, review performance reports, and access growth tools.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
            <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2">
               Get the App
            </button>
            <button className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2">
              ⬛ Get the App
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            ⭐⭐⭐⭐⭐ Used daily by 15,000+ professionals worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
