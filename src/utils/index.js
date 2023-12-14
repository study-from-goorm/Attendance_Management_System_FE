import store from "../store";

export const waitForRehydration = () => {
  return new Promise((resolve) => {
    const checkRehydration = () => {
      if (store.getState()._persist.rehydrated) {
        resolve();
      } else {
        setTimeout(checkRehydration, 50); // 50ms 후에 다시 체크
      }
    };
    checkRehydration();
  });
};
