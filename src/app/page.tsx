import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";


export default async function Home() {
  const jobs = await prisma.job.findMany({
    where:{
      approved:true
    },
    orderBy:{
      createdAt: "desc"
    }
  })
  return (
   <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
    <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
  <section className="flex flex-col md:flex-row gap-4">
    <JobFilterSidebar />
      <div className="grow space-y-4">
        {jobs.map((job)=>(
          <JobListItem job={job} key={job.id} />
          ))}
      </div>
  </section>
      </main>
  );
}
