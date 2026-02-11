/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

/* The code of this component is based on the extensive sources provided for my image component (see file atoms/img-el.tsx) 
and my relatively extensive research on generic interface to use with specific HTML elements 
(see region of the same name in file main-el.tsx). 
*/

/* The following module does style the h1 and the h2 (no class name given) */
import typography from "../../styles/typography.module.scss";
import type { HTMLAttributes } from "react";

interface sectionH1to2ByMariePierreLessard {
    h1: string;
    h2: string;
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children: React.ReactNode;
};

type extendedGenericInterfaceForSh1to2ByMariePierreLessard = HTMLAttributes<HTMLElement> & sectionH1to2ByMariePierreLessard;

export const SectionH1to2ByMariePierreLessard = (
    { h1, h2, children, ...rest }: 
    extendedGenericInterfaceForSh1to2ByMariePierreLessard)=> {
    return (
        <section {... rest}>
            <h1>{h1}</h1>
            <h2>{h2}</h2>
            {children}
        </section>
    );
};
