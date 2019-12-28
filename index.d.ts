export const ready: Promise<void>;

export function format(
  source: string,
  options?: string,
  outputCallback?: (code: number, message: string) => void
): Promise<string>;
