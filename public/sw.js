self.addEventListener("install", (event) => {
  console.log("INSTALLING SUCCESSFULLY");
  event.waitUntil();
});

self.addEventListener("fetch", (event) => {
  console.log("FETCH", event.request.url);
});
