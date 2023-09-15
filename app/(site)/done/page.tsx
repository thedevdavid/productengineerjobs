type Props = {
  params: { slug: string };
};

export default async function DonePage({ params }: Props) {
  console.log(params);
  return (
    <div className="container mx-auto my-20 grid max-w-7xl grid-cols-1 place-items-start justify-between gap-8 lg:grid-cols-4">
      <div className="flex flex-col items-start justify-between rounded-2xl bg-primary px-4 py-8">
        <div className="mb-32">
          <h2 className="mb-2 text-2xl font-extrabold leading-tight">Ship stuff fast with Next.js</h2>
          <p className="text-lg leading-tight text-muted-foreground">Why on Earth would you choose anything else</p>
        </div>
        <time dateTime="2023-09-09" className="text-sm tracking-wider text-muted-foreground">
          2023.09.09
        </time>
      </div>
    </div>
  );
}
