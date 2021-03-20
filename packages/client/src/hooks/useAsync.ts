import { useCallback, useState } from "react";

type PromiseFunction<T, K> = (args?: T) => Promise<K>;

export function useLazyAsync<T, K>(func: PromiseFunction<T, K>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<K | null>(null);

  const execute = useCallback(
    (args?: T) => {
      setIsLoading(true);

      func(args)
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [func]
  );

  return { isLoading, data, execute, error };
}
