/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

import type { HTMLAttributes } from "react";
// This also works: import type { HTMLAttributes } from "../../../node_modules/@types/react/index";

interface justChildrenByMariePierreLessard {
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children: React.ReactNode;
};

// #region Research on generic interface to use with specific HTML elements
/* Based on the extensive sources provided for my image component (see file atoms/img-el.tsx), I simply guessed that 
HTMLElement had to go between the angle brackets (I was offline at the time). 
React doesn't seem to offer a generic interface specifically created for HTML elements like main and section 
(based on a quick search in the node_modules/@types/react/ts5.0/index.d.ts file). 
As a consequence, I am keeping the name of this type neutral to make it more reusable.
Ah! After a longer search in that file, I found the interface IntrinsicElements, which shows that quite a few HTML elements 
do use HTMLAttributes<HTMLElement>. Some also use an interface with another name between angle brackets (which should be 
the name of a type), such as HTMLAttributes<HTMLBodyElement>, HTMLAttributes<HTMLDivElement>, 
HTMLAttributes<HTMLHeadingElement>, HTMLAttributes<HTMLParagraphElement>, HTMLAttributes<HTMLSpanElement>,
HTMLAttributes<HTMLUListElement>,  ...: 
- abbr (searching for abbrHTMLAttributes or HTMLAbbrElement gives no result)
- address (searching for addressHTMLAttributes gives no result)
- article (searching for articleHTMLAttributes gives no result)
- aside (searching for asideHTMLAttributes gives no result)
- b (searching for bHTMLAttributes gives no result)
- ...
Other options: 
- the interface AllHTMLAttributes (which extends the interface HTMLAttributes)
- the interface HTMLProps (which extends the interfaces AllHTMLAttributes and ClassAttributes)
- probably others
*/
// #endregion 
type extendedBasicGenericInterfaceByMariePierreLessard = HTMLAttributes<HTMLElement> & justChildrenByMariePierreLessard;

/* After I added a prop for children, I ended up getting an type error regarding the CSS classes that I had already given main.
As a consequence, the classes had to be provided as arguments instead of being defined here. */
export const MainByMariePierreLessard = ({ children, ...rest }: extendedBasicGenericInterfaceByMariePierreLessard)=> {
    return (
        <main {... rest}>
            {children}
        </main>
    );
};
