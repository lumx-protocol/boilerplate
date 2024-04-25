//create typed request using fetch
export const typedFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const result = await fetch(url, options);
  return result.json() as T;
};
