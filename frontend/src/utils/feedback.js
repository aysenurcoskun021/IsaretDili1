/** Lightweight tactile feedback; gracefully no-ops on unsupported browsers/devices. */
export function hapticFeedback(pattern = 14) {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern);
    }
  } catch { /* Vibration is an optional enhancement. */ }
}

/** Call after a future translation workflow completes: window.dispatchEvent(new Event("signbridge:translation-complete")) */
export function translationCompleteFeedback() {
  hapticFeedback([18, 35, 24]);
}
