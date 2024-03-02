import { UploadButton } from "@/components/UploadFile";

export default async function Home() {
  return (
    <main className="container mx-auto pt-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>
    </main>
  );
}
