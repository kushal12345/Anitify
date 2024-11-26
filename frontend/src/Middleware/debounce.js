const debounce = (func, delay, immediate = false) => {
    let timeoutId;

    const debouncedFunction = (...args) => {
        const context = this; // Capture the context

        const callNow = immediate && !timeoutId;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null; // Reset timeoutId
            if (!immediate) {
                func.apply(context, args);
            }
        }, delay);

        if (callNow) {
            func.apply(context, args);
        }
    };

    // Add a cancel method to clear the timeout
    debouncedFunction.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null; // Reset timeoutId
    };

    return debouncedFunction;
};

export default debounce;