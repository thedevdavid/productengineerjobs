import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center gap-6 border-t py-6 pb-28 sm:pb-6">
      <div className="container flex flex-col items-center justify-between space-y-5 text-center">
        <div className="flex flex-col gap-4 px-8 md:gap-2 md:px-0 lg:order-1">
          <p className="text-sm text-muted-foreground">
            &copy; Pier 418 OÜ {new Date().getFullYear()} Built by&nbsp;
            <a
              href="https://twitter.com/thedevdavid"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              @thedevdavid
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
