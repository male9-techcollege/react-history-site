/* Source for the creation of a custom hook, incl. course notes:
react-wallywood-codealong-med-kasper
*/

import { useState, useEffect } from "react";

/* Custom hook */
/* It is necessary to set a type for the hook in the page where it is invoked 
(posters.tsx in react-router-codealong-med-kasper), 
otherwise a type error is thrown regarding the array called data (below).
Here, <T> is some sort of placeholder for a type, which is declared when the useFetch hook is called.  
useFetch<T>(url: string) {
    useState<T>
};
*/
export function useFetch<T>(url: string) {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    /* The type for error cannot be found in node_modules > @types > react > ts5.0 > index.d.ts (just an interface called ErrorInfo).
    Kasper said that it is a JavaScript thing, not a TypeScript thing. 
    See 
    instanceof Error
    below. */
    const [error, setError] = useState<string | null>();

    /* In the YouTube video "Full React Tutorial #19: Handling Errors" by Net Ninja at
    https://www.youtube.com/watch?v=DTBta08fXGU , 
    .then... .catch is used instead of try... catch. According to that method, one could write the following instead.
    The thrown error is caught by .catch. If throw Error() isn't included, no error will be thrown if there is
    absolutely no response since .catch comes after the two .then. This is why the conditional expression with
    throw Error() is necessary at the state where the browser's fetch API seeks to get a response.
    Reminder: the properties of the response can be consulted in the console (ok, status, etc.).

    useEffect(() => {
        setIsLoading(true);

        fetch(url)
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw Error("Fetch failed");
            };
            return response.json();
        })
        .then((data) => {
            setData(data);
            setIsLoading(false);    
        })
        .catch((error) => {
            console.error("Fetch failed: ", error);
            setError(error.message);
        });
    }, [url]);
    */
    useEffect(() => {

        async function fetchData() {
            setIsLoading(true);

            try {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
                setIsLoading(false);
            } catch(error) {
                /*  instanceof Error is about giving the type of error; it's not a simple string, it's a message. */
                if (error instanceof Error) {
                    setError(error.message);
                    console.error("Fetch failed: ", error);
                } else throw error;
            };
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
};