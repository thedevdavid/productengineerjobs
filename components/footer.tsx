import Link from "next/link";

const navigation = {
  jobs: [
    { name: "Product Engineer", href: "/position/product-engineer" },
    { name: "Platform Engineer", href: "/position/platform-engineer" },
    { name: "Sounds Like...", href: "/position/sounds-like" },
  ],
  companies: [
    { name: "Post a Job", href: "/post-a-job" },
    { name: "Product Engineering for Startups & SMBs", href: "/for-companies" },
    { name: "Product Engineering for Enterprise", href: "/for-enterprise" },
  ],
  location: [
    { name: "US", href: "/location/us" },
    { name: "Europe", href: "/location/europe" },
    { name: "APAC", href: "/location/apac" },
    { name: "EU", href: "/location/eu" },
    { name: "Worldwide", href: "/location/worldwide" },
  ],
  contract: [
    { name: "Full-Time", href: "/contract/full-time" },
    { name: "Part-Time", href: "/contract/part-time" },
    { name: "Contract", href: "/contract/contract" },
  ],
  type: [
    { name: "Remote", href: "/type/remote" },
    { name: "Hybrid", href: "/type/hybrid" },
    { name: "On-Site", href: "/type/on-site" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Terms", href: "/terms-of-use" },
  ],
};

const Footer = () => {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <Link href="/" aria-label="Go to Home" className="font-extrabold">
              <svg
                viewBox="0 0 390 390"
                fill="currentColor"
                className="mr-2 inline-block h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M79 222V168H133H156H258V71H171V17H258H312V71V168V222H258H241H165H133H79ZM79 319V370V373H133V319H79ZM171 319V373H312V370V319H258H241H171ZM133 17H79V71H133V17Z"
                />
              </svg>
              <span>ProductEngineerJobs.co</span>
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">By Position</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.jobs.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">By Location</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.location.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 md:mt-0">
            <h3 className="text-sm font-semibold leading-6">By Place</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.type.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 md:mt-0">
            <h3 className="text-sm font-semibold leading-6">By Contract</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.contract.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 md:mt-0">
            <h3 className="text-sm font-semibold leading-6">Companies</h3>
            <ul role="list" className="mt-3 space-y-2">
              {navigation.companies.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
          </div>
          <form className="mt-3 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div> */}
        <div className="mt-8 border-t border-border pt-8 text-sm md:flex md:items-center md:justify-between">
          <div className="md:order-3">
            <a href="https://davidlevai.com" className="text-muted-foreground hover:text-foreground">
              Click here to hire a Product Engineer in a monthly subscription instead
            </a>
          </div>
          <p className="mt-8 leading-5 text-muted-foreground md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Pier 418 OÜ. All rights reserved. Built by{" "}
            <a href="https://twitter.com/thedevdavid" className="hover:text-foreground">
              @thedevdavid
            </a>
            .
          </p>
          <ul role="list" className="flex list-none flex-row space-x-2 md:order-2">
            {navigation.legal.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
