"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const {
    companyName,
    locationType,
    title,
    type,
    applicationEmail,
    applicationUrl,
    companyLogo,
    description,
    location,
    salary,
  } = createJobSchema.parse(values);
  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access:"public",
        addRandomSuffix:false
      }
    );
    companyLogoUrl = blob.url
  }
  await prisma.job.create({
    data:{
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: salary ? parseInt(salary) : null
    }
  })
  redirect("/job-submitted")
}
