import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4">
      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className="text-black hover:text-cyan-600 text-xl flex items-center hover:bg-white rounded px-4 py-3 transition-all"
            >
              <svg
                className="w-[20px] h-[20px] mr-4"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
                ></path>
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact-me"
              className="text-black hover:text-cyan-600 text-xl flex items-center hover:bg-white rounded px-4 py-3 transition-all"
            >
              <svg
                className="w-[20px] h-[20px] mr-4"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2.5 13.25c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9M12 12.25A2.25 2.25 0 0 0 14.25 10A2.25 2.25 0 0 0 12 7.75A2.25 2.25 0 0 0 9.75 10A2.25 2.25 0 0 0 12 12.25"
                ></path>
              </svg>
              <span>Contact Me</span>
            </Link>
          </li>
          <li>
            <Link
              href="/all-messages"
              className="text-black hover:text-cyan-600 text-xl flex items-center hover:bg-white rounded px-4 py-3 transition-all"
            >
              <svg
                className="w-[20px] h-[20px] mr-4"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4z"
                ></path>
              </svg>
              <span>All Messages</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
