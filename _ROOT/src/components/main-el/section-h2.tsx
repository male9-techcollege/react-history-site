/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

/* The code of this component is based on the extensive sources provided for my image component (see file atoms/img-el.tsx)
and my relatively extensive research on generic interface to use with specific HTML elements 
(see region of the same name in file main-el.tsx). 
*/

/* The following module does style the h2 (no class name given) */
import typography from "../../styles/typography.module.scss";
import type { HTMLAttributes } from "react";

interface sectionH2ByMariePierreLessard {
    h2: string;
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children: React.ReactNode;
};

type extendedGenericInterfaceForSh2ByMariePierreLessard = HTMLAttributes<HTMLElement> & sectionH2ByMariePierreLessard;

export const SectionH2ByMariePierreLessard = (
    { h2, children, ...rest }: 
    extendedGenericInterfaceForSh2ByMariePierreLessard)=> {
    return (
        <section {... rest}>
            <h2>{h2}</h2>
            {children}
        </section>
    );
};
