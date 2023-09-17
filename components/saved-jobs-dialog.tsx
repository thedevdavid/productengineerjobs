// import { BookmarkIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
// import { useLiveQuery } from "dexie-react-hooks";
// import { Trash } from "iconoir-react";

// // import { db } from "@/lib/db";
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
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { EmptyList } from "./empty-list";

// type SavedJobsDialogProps = {
//   onOpenChange: (open: boolean) => void;
//   handleLoad: (id: number) => void;
// };

// export const SavedJobsDialog = ({ onOpenChange, handleLoad }: SavedJobsDialogProps) => {
//   const savedJobs = useLiveQuery(() => db.jobs.toArray());

//   const handleDelete = async (event) => {
//     event.preventDefault();
//     console.log(event);
//     // await db.jobs.delete(id);
//   };

//   return (
//     <Dialog onOpenChange={onOpenChange}>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="group hover:bg-background">
//           <BookmarkIcon className="mr-2 duration-150 ease-linear group-hover:scale-110" />
//           Saved Job Posts
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-xl">
//         <DialogHeader>
//           <DialogTitle>Let&apos;s see what you&apos;ve got here...</DialogTitle>
//           <DialogDescription>These are your saved job posts on this device.</DialogDescription>
//         </DialogHeader>
//         <div>
//           {!savedJobs && (
//             <EmptyList title="No jobs found" description="You haven't saved any job posts yet." buttonHref={false} />
//           )}
//           {savedJobs?.length === 0 && (
//             <EmptyList title="No jobs found" description="You haven't saved any job posts yet." buttonHref={false} />
//           )}
//           <div className="" role="list">
//             {savedJobs &&
//               savedJobs?.length > 0 &&
//               savedJobs?.map((job) => (
//                 <div
//                   role="listitem"
//                   key={job.id}
//                   className="flex flex-row items-center justify-between rounded px-1 py-3 transition-colors duration-75 ease-linear hover:bg-muted"
//                 >
//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Job saved at <span className="font-bold">{format(new Date(Number(job?.date)), "PPpp")}</span>
//                     </p>
//                   </div>
//                   <div className="space-x-1">
//                     <Button variant="outline" onClick={() => handleLoad(job.id)}>
//                       Load
//                     </Button>
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button variant="destructive">Delete</Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This action cannot be undone. This will permanently delete your saved job post and remove
//                             your data from your machine.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>

//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction onClick={handleDelete}>
//                             <Trash className="mr-2 h-5 w-5" />
//                             Continue deleting
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
