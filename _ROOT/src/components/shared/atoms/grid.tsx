/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

/* The code of this component is based on the extensive sources provided for my image component (see file atoms/img-el.tsx)
and my relatively extensive research on generic interface to use with specific HTML elements 
(see region of the same name in file main-el.tsx). 
*/

import type { HTMLAttributes } from "react";

interface justChildrenByMariePierreLessard {
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children: React.ReactNode;
};

type extendedGenericInterfaceForDivByMariePierreLessard = HTMLAttributes<HTMLDivElement> & justChildrenByMariePierreLessard;

export const GridByMariePierreLessard = ({ children, ...rest }: extendedGenericInterfaceForDivByMariePierreLessard)=> {
    return (
        <div {... rest}>
            {children}
        </div>
    );
};
