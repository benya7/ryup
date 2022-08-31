/* eslint-disable no-unused-vars */
export default function handleError(
  e: any,
  handler: (e: Error | undefined) => void
) {
  if ("reason" in e) {
    handler(new Error(e.reason));
  } else if (e instanceof Error) {
    handler(e);
  } else {
    handler(new Error(e));
  }
  console.log(e);
}
