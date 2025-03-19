import prisma from "@/lib/prisma"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"

async function filterJobs(formDate:FormData) {
  "use server"
}


const JobFilterSidebar = async() => {
  const distinctLocation = (await prisma.job.findMany({
    where:{approved:true},
    select:{location:true},
    distinct:["location"]
  }).then(locations=>
    locations.map(({location})=>location).filter(Boolean)
  )) as string[]
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, Company, etc."/>
          </div>
          <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {distinctLocation.map(location=>(
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </aside>
  )
}

export default JobFilterSidebar