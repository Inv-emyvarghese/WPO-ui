/** Merge class names; falsy values are omitted (simple clsx-style helper). */
export function cx(
  ...inputs: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string") {
      out.push(input);
      continue;
    }
    for (const [key, value] of Object.entries(input)) {
      if (value) out.push(key);
    }
  }
  return out.join(" ");
}
