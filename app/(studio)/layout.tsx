import "@/app/globals.css";

export const metadata = {
  title: "ProductEngineerJobs.co Studio",
  description: "ProductEngineerJobs.co Studio",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
