export default function Welcome() {
    return(
      <div className="flex-1 bg-black text-white flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-gray-700 rotate-45 opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-2 h-20 bg-gray-700 rotate-12 opacity-30"></div>
        <div className="w-full max-w-lg space-y-8 relative z-10">
          {/* Large Logo */}
          {/* <div className="text-center">
              <Image
                src={quillIcon}
                height={150}
                width={150}
                alt=""
              />
              <div className="flex items-center text-gray-700">
                Compendia
              </div>
          </div> */}


          {/* Welcome Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome to Compendia</h2>
            <p className="text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Join us and start summarizing your text today.
            </p>
            <p className="text-gray-400 text-sm">
              More than 17k people joined us, it's your turn
            </p>
          </div>


          {/* Promotional Card */}
          <div className="bg-gray-800 border-gray-700 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            {/* Profile Avatars */}
            <div className="flex -space-x-2">
              <img src="/images/profile-1.png" alt="User 1" className="w-8 h-8 rounded-full border-2 border-gray-800" />
              <img src="/images/profile-2.png" alt="User 2" className="w-8 h-8 rounded-full border-2 border-gray-800" />
              <img src="/images/profile-3.png" alt="User 3" className="w-8 h-8 rounded-full border-2 border-gray-800" />
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center">
                <span className="text-xs text-white">
                  +2
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
}