"use client";
import FileCard from "@/components/FileCard";
import { UploadButton } from "@/components/UploadFile";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <Loader2 size={48} className="animate-spin" />

          <p className="text-gray-500 text-2xl ml-4">Loading...</p>
        </div>
      )}

      {!isLoading && files?.length === 0 && (
        <div className="flex flex-col gap-4  justify-center items-center mx-auto w-full mt-12">
          <Image src="/empty.svg" alt="Empty Files" width={300} height={300} />
          <p className="text-center text-gray-500 text-2xl">
            No files found
            <br />
            <span className="text-gray-400 text-lg">Try uploading a file</span>
          </p>
          <UploadButton />
        </div>
      )}

      {!isLoading && files?.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold">Your Files</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {files?.map(file => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
