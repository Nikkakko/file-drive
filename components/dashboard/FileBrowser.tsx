"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import SearchBar from "@/components/SearchBar";

import Image from "next/image";
import { GridIcon, Loader2, RowsIcon, TableIcon } from "lucide-react";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { UploadButton } from "../UploadFile";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import FileCard from "../FileCard";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <div className="text-2xl">You have no files, upload one now</div>
      <UploadButton />
    </div>
  );
}

export function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const searchParams = useSearchParams();
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  const s = searchParams.get("s")?.toString();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query: s,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );
  const isLoading = files === undefined;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar />
        <UploadButton />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {files?.map(file => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading your files...</div>
        </div>
      )}

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
