export const REVALIDATE_SECONDS = 3600;

export function staticPropsWithRevalidate<T extends Record<string, unknown>>(
  props: T
) {
  return {
    props,
    revalidate: REVALIDATE_SECONDS,
  };
}
