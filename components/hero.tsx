import { Searchbar } from "./searchbar";

const Hero = () => {
  return (
    <div className="container flex max-w-7xl flex-col items-center justify-center text-center sm:py-20">
      <h1 className="mb-2 flex flex-col items-center text-4xl font-bold leading-tight tracking-tight sm:flex-row md:text-6xl">
        Search
        <span className="relative h-[1em] w-64 overflow-hidden">
          <span className="absolute left-0 top-0 h-full w-full -translate-y-full animate-slide leading-none [animation-delay:1.83s]">
            Product
          </span>
          <span className="absolute left-0 top-0 h-full w-full -translate-y-full animate-slide leading-none [animation-delay:3s]">
            Platform
          </span>
        </span>{" "}
        Engineer Jobs
      </h1>
      <div className="flex content-center items-center justify-center">
        <Searchbar />
      </div>
    </div>
  );
};

export default Hero;
