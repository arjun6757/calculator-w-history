import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    
    /*
        here we are making a customized react hook to use the localStorage
    */
 

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);     // will return the item data
            return item ? JSON.parse(item) : initialValue;  // if item exists return the item data else return the initial value
        } catch (error) {
            console.log("error reading item from local storage", error);
            return initialValue;
        }
    });

    /* effect to update localstorage when the stored value changes or the key changes
       key can be multiple values if it match to existing keys in localstorage
       then it will update the value in the localstorage or if the key is not in the localstorage
       then it will create a new key in the localstorage
    */

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.log("error saving item to local storage", error);
        }
    }, [storedValue, key]);

    return [storedValue, setStoredValue];
    // this are usable by other components just like how we use react useState hook
}