import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";

interface DeleteDialogProps {
  title: string;
  description: string;
  onDelete: () => void;
}

export default function DeleteDialog({
  title,
  description,
  onDelete,
}: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" type="button">
          <Icons.trash className="w-4 h-4 mr-2" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">{title}</DialogTitle>
          <DialogDescription>
            Apakah anda yakin untuk menghapus{" "}
            <span className="font-semibold">{description}</span>?
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter className="flex items-center">
          <DialogPrimitive.Close asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogPrimitive.Close>
          <Button type="submit" onClick={onDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
