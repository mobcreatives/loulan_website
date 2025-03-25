import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

<<<<<<< HEAD
=======
export const auth = () => ({ id: "fakeId" }); // Fake auth function

>>>>>>> 3e4eb4ad41d248e4de4cbde8a727fb3f183b5630
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  foodImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file", file);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
