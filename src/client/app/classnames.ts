export default function cx(...classNames: (string | undefined)[]): string {
  return classNames.join(' ')
}
