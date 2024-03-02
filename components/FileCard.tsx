import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  GanttChart,
  ImageIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "./ui/use-toast";
import Image from "next/image";

interface FileCardProps {
  file: Doc<"files">;
}

export function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}
const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileText />,
    csv: <GanttChart />,
  } as Record<Doc<"files">["type"], React.ReactNode>;

  const getImage = getFileUrl(file.fileId);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 capitalize">
          <div className="flex items-center justify-center">
            {" "}
            {typeIcons[file.type]}
          </div>
          {file.name}
        </CardTitle>
        <div className="absolute right-2 top-2">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent>
        {file.type === "image" && (
          <Image
            src={getImage || "/placeholder.svg"}
            alt={file.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
        {file.type === "pdf" && (
          <div className="flex items-center justify-center h-48 w-full bg-gray-100">
            <FileText className="size-12" />
          </div>
        )}

        {file.type === "csv" && (
          <div className="flex items-center justify-center h-48 w-full bg-gray-100">
            <GanttChart className="size-12" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            // open file in new tab
            window.open(getFileUrl(file.fileId), "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;

function FileCardActions({ file }: { file: Doc<"files"> }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const deleteFile = useMutation(api.files.deleteFile);
  const { toast } = useToast();

  function handleDelete() {
    startTransition(async () => {
      await deleteFile({ fileId: file._id });
      toast({
        title: "File Deleted",
        description: "The file has been deleted",
        variant: "destructive",
      });
    });

    setIsConfirmingDelete(false);
  }

  return (
    <>
      <AlertDialog
        open={isConfirmingDelete}
        onOpenChange={setIsConfirmingDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-1 text-destructive cursor-pointer"
            onClick={() => setIsConfirmingDelete(true)}
          >
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
