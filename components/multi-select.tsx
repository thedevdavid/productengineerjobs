"use client";

import * as React from "react";
import { MultiSelectOptions } from "@/types";
// import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowUnionVertical, Check } from "iconoir-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// FIXME: https://twitter.com/lemcii/status/1659649371162419202?s=46&t=gqNnMIjMWXiG2Rbrr5gT6g
// Removing states would help maybe?

const badgeStyle = (color: string) => ({
  borderColor: `${color}20`,
  backgroundColor: `${color}30`,
  color,
});

type MultiSelectProps = {
  options: MultiSelectOptions[];
  formField: "tags" | "benefits";
  onSelect: (value: MultiSelectOptions[], formField: "tags" | "benefits") => void;
  items?: MultiSelectOptions[];
  // TODO: Handle state from the parent with react hook form
};

export function MultiSelect({ options, onSelect, formField }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<MultiSelectOptions[]>(options);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  // const [openDialog, setOpenDialog] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [selectedValues, setSelectedValues] = React.useState<MultiSelectOptions[]>([options[0]]);

  // const createItem = (name: string) => {
  //   const newItem = {
  //     value: name.toLowerCase(),
  //     label: name,
  //     color: "#ffffff",
  //   };
  //   setItems((prev) => [...prev, newItem]);
  //   setSelectedValues((prev) => [...prev, newItem]);
  // };

  const debouncedUpdates = useDebouncedCallback(async () => {
    onSelect(selectedValues, formField);
  }, 500);

  const toggleItem = (item: MultiSelectOptions) => {
    setSelectedValues((currentItems) =>
      !currentItems.includes(item) ? [...currentItems, item] : currentItems.filter((l) => l._id !== item._id)
    );
    inputRef?.current?.focus();
    debouncedUpdates();
  };

  // const updateItem = (item: MultiSelectOptions, newItem: MultiSelectOptions) => {
  //   setItems((prev) => prev.map((f) => (f.value === item.value ? newItem : f)));
  //   setSelectedValues((prev) => prev.map((f) => (f.value === item.value ? newItem : f)));
  // };

  // const deleteItem = (item: MultiSelectOptions) => {
  //   setItems((prev) => prev.filter((f) => f.value !== item.value));
  //   setSelectedValues((prev) => prev.filter((f) => f.value !== item.value));
  // };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  return (
    <div className="w-full">
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-[256px] justify-between text-foreground"
          >
            <span className="truncate">
              {selectedValues.length === 0 && "Select"}
              {selectedValues.length === 1 && selectedValues[0].label}
              {selectedValues.length === 2 && selectedValues.map(({ label }) => label).join(", ")}
              {selectedValues.length > 2 && `${selectedValues.length} selected`}
            </span>
            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[256px] p-0">
          <Command loop>
            <CommandInput ref={inputRef} placeholder="Search..." value={inputValue} onValueChange={setInputValue} />
            <CommandGroup className="max-h-[160px] overflow-auto">
              {items.map((item) => {
                const isActive = selectedValues.includes(item);
                return (
                  <CommandItem key={item._id} value={item.value} onSelect={() => toggleItem(item)}>
                    <Check className={cn("mr-2 h-4 w-4", isActive ? "opacity-100" : "opacity-0")} />
                    <div className="flex-1">{item.label}</div>
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                  </CommandItem>
                );
              })}
              {/* <CommandItemCreate onSelect={() => createItem(inputValue)} {...{ inputValue, items }} /> */}
            </CommandGroup>
            {/* <CommandSeparator alwaysRender />
            <CommandGroup>
              <CommandItem
                value={`:${inputValue}:`} // HACK: that way, the edit button will always be shown
                className="text-xs text-muted-foreground"
                onSelect={() => setOpenDialog(true)}
              >
                <div className={cn("mr-2 h-4 w-4")} />
                <EditPencil className="mr-2 h-2.5 w-2.5" />
                Edit Labels
              </CommandItem>
            </CommandGroup> */}
          </Command>
        </PopoverContent>
      </Popover>
      {/* <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          if (!open) {
            setOpenCombobox(true);
          }
          setOpenDialog(open);
        }}
      >
        <DialogContent className="flex max-h-[90vh] flex-col">
          <DialogHeader>
            <DialogTitle>Edit Labels</DialogTitle>
            <DialogDescription>
              Change the label names or delete the labels. Create a label through the combobox though.
            </DialogDescription>
          </DialogHeader>
          <div className="-mx-6 flex-1 overflow-scroll px-6 py-2">
            {items.map((item) => {
              return (
                <DialogListItem
                  key={item.value}
                  onDelete={() => deleteItem(item)}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & Record<"name" | "color", { value: string }>;
                    const newItem = {
                      value: target.name.value.toLowerCase(),
                      label: target.name.value,
                      color: target.color.value,
                    };
                    updateItem(item, newItem);
                  }}
                  {...item}
                />
              );
            })}
          </div>
          <DialogFooter className="bg-opacity-40">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <div className="mt-3">
        {selectedValues.map(({ _id, label, value, color }) => (
          <Badge key={_id} variant="outline" style={badgeStyle(color)} className="mb-2 mr-2">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// const CommandItemCreate = ({
//   inputValue,
//   items,
//   onSelect,
// }: {
//   inputValue: string;
//   items: MultiSelectOptions[];
//   onSelect: () => void;
// }) => {
//   const hasNoItem = !items.map(({ value }) => value).includes(`${inputValue.toLowerCase()}`);

//   const render = inputValue !== "" && hasNoItem;

//   if (!render) return null;

//   // BUG: whenever a space is appended, the Create-Button will not be shown.
//   return (
//     <CommandItem
//       key={`${inputValue}`}
//       value={`${inputValue}`}
//       className="text-xs text-muted-foreground"
//       onSelect={onSelect}
//     >
//       <div className={cn("mr-2 h-4 w-4")} />
//       Create new label &quot;{inputValue}&quot;
//     </CommandItem>
//   );
// };

// const DialogListItem = ({
//   value,
//   label,
//   color,
//   onSubmit,
//   onDelete,
// }: MultiSelectOption & {
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   onDelete: () => void;
// }) => {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [accordionValue, setAccordionValue] = React.useState<string>("");
//   const [inputValue, setInputValue] = React.useState<string>(label);
//   const [colorValue, setColorValue] = React.useState<string>(color);
//   const disabled = label === inputValue && color === colorValue;

//   React.useEffect(() => {
//     if (accordionValue !== "") {
//       inputRef.current?.focus();
//     }
//   }, [accordionValue]);

//   return (
//     <Accordion key={value} type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
//       <AccordionItem value={value}>
//         <div className="flex items-center justify-between">
//           <div>
//             <Badge variant="outline" style={badgeStyle(color)}>
//               {label}
//             </Badge>
//           </div>
//           <div className="flex items-center gap-4">
//             <AccordionTrigger>Edit</AccordionTrigger>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 {/* REMINDER: size="xs" */}
//                 <Button variant="destructive" size="xs">
//                   Delete
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you sure sure?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     You are about to delete the label{" "}
//                     <Badge variant="outline" style={badgeStyle(color)}>
//                       {label}
//                     </Badge>{" "}
//                     .
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>
//         <AccordionContent>
//           <form
//             className="flex items-end gap-4"
//             onSubmit={(e) => {
//               onSubmit(e);
//               setAccordionValue("");
//             }}
//           >
//             <div className="grid w-full gap-3">
//               <Label htmlFor="name">Label name</Label>
//               <Input
//                 ref={inputRef}
//                 id="name"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="h-8"
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="color">Color</Label>
//               <Input
//                 id="color"
//                 type="color"
//                 value={colorValue}
//                 onChange={(e) => setColorValue(e.target.value)}
//                 className="h-8 px-2 py-1"
//               />
//             </div>
//             {/* REMINDER: size="xs" */}
//             <Button type="submit" disabled={disabled} size="xs">
//               Save
//             </Button>
//           </form>
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// };
