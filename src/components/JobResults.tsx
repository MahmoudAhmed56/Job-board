import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { jobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultsProps {
  filterValues: jobFilterValues;
}

const JobResults = async ({
  filterValues: { location, q, remote, type },
}: JobResultsProps) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};
  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "remote" } : {},
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
        <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && <p className="text-center m-auto">
      No jobs founded. Try adjusting your filters.
      </p>}
    </div>
  );
};

export default JobResults;
