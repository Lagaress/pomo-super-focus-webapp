"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { useState } from "react";
import { Checkbox } from "../ui/primitives/checkbox";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import { Textarea } from "../ui/primitives/textarea";

type BucketSidesheetProps = {
  children: React.ReactNode;
};

type BucketItem = {
  title: string;
  description: string;
  isCompleted: boolean;
};

const CreateBucketItemSidesheet = ({ children }: BucketSidesheetProps) => {
  const [itemObj, setItemObj] = useState<BucketItem>({
    title: "",
    description: "",
    isCompleted: false,
  });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              Add New Item!
            </SheetTitle>
            <SheetDescription>
              Bucket list has no limits;) add it as many as you want!
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">Title</div>
              <Input
                value={itemObj.title}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-black">
                Describe your bucket item!
              </div>

              <Textarea
                value={itemObj.description}
                onChange={(e: any) =>
                  setItemObj({ ...itemObj, description: e.target.value })
                }
              />
            </div>

            <div className="flex gap-1 items-center">
              <Checkbox
                id="item-completed"
                checked={itemObj.isCompleted}
                onCheckedChange={() =>
                  setItemObj({ ...itemObj, isCompleted: !itemObj.isCompleted })
                }
              />
              <Label htmlFor="item-completed" className="text-sm">
                Yay! I have completed this off!! 🥳
              </Label>
            </div>
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button className="w-full">Add Item!</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateBucketItemSidesheet;
