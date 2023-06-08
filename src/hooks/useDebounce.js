import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handles = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(handles);
    }, [value]);

    return debounceValue;
}

export default useDebounce;
