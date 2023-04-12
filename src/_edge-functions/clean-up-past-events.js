import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";


// this is a temporary solution to remove "past" events on a visit to the page
// if I have forgotten to rebuild my static site to update it!

export default async (request, context) => {
  const response = await context.next();

  return new HTMLRewriter()
    .on("[data-event-date]", {
      element(element) {
        const dateString = element.getAttribute("data-event-date");
        const date = new Date(dateString);
        const now = new Date();

        // add three hours to avoid removing events that are in progress
        const cutOff = now.setTime(now.getTime() + 3 * 60 * 60 * 1000);

        if (cutOff > date) {
          element.remove();
        }
      },
    })
    .transform(response);
};
