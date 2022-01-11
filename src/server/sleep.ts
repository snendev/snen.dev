export default async function sleep(seconds: number) {
  return await new Promise<void>((resolve) => {
    setTimeout(
      () => { resolve() },
      seconds * 1000,
    )
  })
}
