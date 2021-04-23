import { useState, useCallback, useRef } from "react";

// https://gist.github.com/mbelsky/72c1117a63489daf8e6067049d4532d0
export const useHover = <T extends HTMLElement>(): [
  (node?: T | null) => void,
  boolean
] => {
  const [value, setValue] = useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef<T>();

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback<(node?: null | T) => void>(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseOver);
        ref.current.removeEventListener("mouseleave", handleMouseOut);
      }

      ref.current = node || undefined;

      if (ref.current) {
        ref.current.addEventListener("mouseenter", handleMouseOver);
        ref.current.addEventListener("mouseleave", handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [callbackRef, value];
};
