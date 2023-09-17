import { SiteMetaData } from "@/types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? (process.env.NEXT_PUBLIC_BASE_URL as string)
    : (process.env.VERCEL_URL as string)
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;

const defaultTitle = `Product Engineer Jobs`;
const defaultDescription = `Jobs around the world 🌴.`;

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  siteRepo: "https://github.com/thedevdavid/digital-garden",
  newsletterProvider: "mailerlite",
  newsletterUrl: "https://developreneur.davidlevai.com",
  analyticsProvider: "umami",
  defaultTheme: "light",
  activeAnnouncement: true,
  postsPerPage: 10,
  postsOnHomePage: 8,
  projectsOnHomePage: 4,
};

export default siteMetadata;
