import { Router, contentType } from "./deps.ts";

const apiRouter = new Router();

const FIRST_FIFTY_INTS = Array(50).fill(0).map((_, i) => i);
const PAGE_SIZE = 4;
apiRouter.get("/api/archive/:page", (context) => {
  const { page } = context.params;

  const pageNumber = +(page ?? 0);
  if (Number.isNaN(pageNumber)) {
    context.response.status = 400;
    context.response.body = "Bad Request";
  }

  const startValue = pageNumber * PAGE_SIZE;
  const numbers = FIRST_FIFTY_INTS.slice(startValue, startValue + PAGE_SIZE);

  context.response.type = contentType(".json");
  context.response.body = JSON.stringify(numbers);
});

export default apiRouter;
