import JobListItem from "@/components/JobListItem";
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
    {jobs.map((job)=>(
      <JobListItem job={job} key={job.id} />
    ))}
   </main>
  );
}
