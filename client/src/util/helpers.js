

export const clearMessageAfterDelay = (clearFn, delay = 2000) => {
    setTimeout(() => {
      clearFn("");
    }, delay);
  };
  