import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

// Update the interface so that searchParams is a Promise
interface PageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  }>;
}

function getTitle({ q, location, remote, type }: JobFilterValues) {
  const TitlePreFix = q
    ? `${q} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? `Remote jobs`
        : "All jobs";
  const titleSuffix = location ? ` in ${location}` : "";
  return `${TitlePreFix}${titleSuffix}`;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q, type, location, remote } = await searchParams;
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { location, q, remote, type, page } = await searchParams;
  const filterValues: JobFilterValues = {
    q,
    location,
    remote: remote === "true",
    type,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
Home.displayName = "HomePage";
