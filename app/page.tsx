export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
            By{" "}
            <div className="flex gap-2 items-center">
              <svg
                width="9.9781479mm"
                height="10.265833mm"
                viewBox="0 0 99.781479 102.65833"
                version="1.1"
                id="svg1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs id="defs1" />
                <g id="layer1" transform="translate(-61.502024,-71.030438)">
                  <path
                    id="rect1"
                    style={{
                      fill: "white",
                      fillOpacity: 1,
                      strokeWidth: 23.4141,
                    }}
                    d="m 112.83119,71.030438 c -1.41111,0 -1.69327,0.282334 -26.352397,24.97677 -24.694395,24.659112 -24.976769,24.976562 -24.976769,26.352392 0,1.37582 0.24724,1.65814 10.513052,11.88868 9.383868,9.38387 10.724417,10.5836 12.841078,11.57138 4.691938,2.18717 9.31314,2.22235 14.075624,0.0351 2.786952,-1.23473 13.864162,-6.24438 23.953582,-10.7952 4.16277,-1.86972 8.78451,-3.9863 10.23089,-4.65657 1.44639,-0.70556 3.66872,-1.69343 4.93871,-2.2226 5.78555,-2.43416 15.80445,-7.19677 16.93334,-8.04343 4.23333,-3.17498 6.80865,-8.85463 6.20892,-13.65239 -0.28223,-2.04611 -1.19969,-5.00945 -1.6583,-5.29167 -0.17638,-0.10583 -2.92785,0.52907 -6.13812,1.48156 l -5.82084,1.6583 -16.6863,-16.651182 C 114.48952,71.312762 114.20703,71.030438 112.83119,71.030438 Z m 0,8.114233 13.6524,13.652397 c 7.51414,7.514152 13.547,13.758302 13.40589,13.899412 -0.14111,0.10583 -1.3408,0.56434 -2.71663,0.9524 -1.34055,0.42333 -7.69021,2.36371 -14.11076,4.33927 -6.38526,1.97554 -12.20645,3.73913 -12.87673,3.91552 -0.67028,0.17639 -4.48029,1.34083 -8.46667,2.57555 -3.986387,1.23473 -7.937291,2.43416 -8.78396,2.64583 -1.164159,0.31749 -1.446393,0.49357 -1.058334,0.74052 0.282221,0.17639 0.881738,0.31781 1.375627,0.31781 1.44638,0 4.339207,1.55212 5.679755,3.06906 1.834452,2.04611 2.575352,4.19793 2.363682,6.91431 -0.3175,3.80999 -2.575502,6.84396 -6.032706,8.18451 -2.010828,0.74084 -5.467959,0.60007 -7.302397,-0.35243 -1.305277,-0.635 -17.991667,-17.00423 -17.991667,-17.63923 0,-0.17639 9.630929,-9.98335 21.413679,-21.76611 z M 159.71566,127.828 c -0.56444,0.0353 -20.5672,13.19372 -27.58746,18.16788 -5.60915,3.95111 -17.00385,12.453 -18.13274,13.51133 -0.9525,0.84667 -0.98778,0.88184 -3.175,0.42323 -3.52776,-0.70555 -11.253756,-3.38651 -15.839861,-5.46788 -2.293048,-1.02306 -4.197675,-1.79941 -4.197675,-1.6583 0,0.14111 4.656606,4.90363 10.336326,10.58333 10.05414,10.01888 10.33611,10.30118 11.71194,10.30118 1.37584,0 1.69355,-0.31729 20.99044,-19.50837 10.75971,-10.68915 21.09608,-21.02591 22.89525,-22.93091 1.83443,-1.8697 3.21045,-3.42149 2.99878,-3.42149 z"
                  />
                </g>
              </svg>
              <p className="logoName">DELEGUE</p>
            </div>
          </a>
        </div>
      </div>

      <div className="relative flex justify-center place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className=" flex flex-col items-center text-center gap-3 w-3/4">
          <h1 className="text-3xl">
            Welcome to DELGUE - Revolutionizing Education Management
          </h1>
          <h2 className="text-2xl">Early Access Now Available!</h2>
          <p>
            Are you a professor seeking a smarter way to manage your
            students&apos; data and resources? Look no further.
          </p>
        </div>
      </div>

      <form className="flex gap-3 items-center flex-col md:flex-row">
        <input
          className="p-2 rounded-full outline-none text-black"
          type="email"
          required
          placeholder="Join the waitlist..."
        />
        <button type="submit" className="bg-slate-600 p-2 rounded-full">
          Join Waitlist
        </button>
      </form>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Student Data Made Simple
          </h2>
          <p className={`m-0 max-w-[40ch] text-sm opacity-50`}>
            Effortlessly manage student information with our intuitive platform.
            Say goodbye to complex spreadsheets and hello to interactive,
            up-to-date student profiles.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Track Performance & Engagement
          </h2>
          <p className={`m-0 max-w-[40ch] text-sm opacity-50`}>
            Keep a close eye on your students&apos; progress with real-time
            performance tracking. Monitor participation, attendance, and
            academic achievements at your fingertips.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Collaborative Community
          </h2>
          <p className={`m-0 max-w-[40ch] text-sm opacity-50`}>
            Join a vibrant community of educators who share your passion.
            Exchange resources, lesson plans, and insights to enhance your
            teaching experience.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Empowering Students</h2>
          <p className={`m-0 max-w-[40ch] text-sm opacity-50`}>
            In our next update, students will have a voice too! They can seek
            help, share problems, and engage with qualified teachers, creating a
            supportive learning environment.
          </p>
        </a>
      </div>
    </main>
  );
}
