import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  const locale = request.headers["accept-language"] || "en-GB";
  const response = await context.next();
  const { timezone } = context.geo;

  return new HTMLRewriter()
    .on("[data-time]", {
      element(element) {
        const dateString = element.getAttribute("data-time");
        const date = new Date(dateString);
        const localizedTime = date.toLocaleString(locale, {
          timeZone: timezone,
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          weekday: "short",
          month: "short",
        });

        element.setInnerContent(`${localizedTime} ${timezone}`);
      },
    })
    .transform(response);
};
