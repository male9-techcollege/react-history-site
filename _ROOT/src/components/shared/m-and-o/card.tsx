/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

/* The code of these card components and their inner components is based on:
- my earlier card assignments with an anchor element as the top-level element (see card-anchor.tsx)
- the extensive sources provided for my image component (see file atoms/img-el.tsx); 
- my relatively extensive research on generic interface to use with specific HTML elements 
  (see region of the same name in file main-el.tsx);
- switch-codelab 
- for if... else...: react-component-codealong-med-kasper + my implementation of that in react-pros-and-cons, dynamic-list.tsx
- see also sources for way to fold regions in .jsx files and for 
  concatenation/combination of CSS classes in React in the file App.tsx.
*/

import type { HTMLAttributes, FormHTMLAttributes } from "react";
import type { headingElInterfaceByMariePierreLessard } from "../atoms/heading";
import { HeadingElByMariePierreLessard } from "../atoms/heading";
import type { cardBodyInterfaceByMariePierreLessard, cardFooterInterfaceByMariePierreLessard } from "../atoms/card-parts";
import { CardBodyByMariePierreLessard, CardFooterByMariePierreLessard } from "../atoms/card-parts";

/* IMPORTANT NOTE: 
Since cards are NOT ALWAYS part of a set, that is to say that they can be used as isolated design elements 
(Google search results said so), I did not include the li element (LiHTMLAttributes<HTMLLIElement>) in the card components. 
Moreover, any component designed to be the parent of cards is bound to be structured to accept anchor cards as children, 
so a card component with a li in it might not be useful very often. 
*/

// #region Card itself (container that is NOT a link) (organism) (region includes variants)
/* The following card components are an edited copy of the anchor cards (cards in which the top ancestor is a link) */

/* This interface is used by multiple components in this region. 
I called it non-focusable card because "card without link" could easily become a misnomer since the body or the footer
of the card could contain a link. What I mean is that the card itself is not a link. It's just a container.
*/
interface NonFocusableCardInterfaceByMariePierreLessard {
    // #region Explanation for styling choices/course notes
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    /* REMINDER:
    - I chose to make the card component a flex container (not a grid) because the order of children of a flex container 
    can be changed with CSS. This cannot be done with inner grids. The children property below needs to be given a specific
    position in the card component (see return()), but the design could require a child picture to be above or below a heading, 
    etc.
    - It is important to KEEP the children property because exercise 3 requires an image to be added to the card!
    In theory, one could also add a badge, an overlay, etc. */
    // #endregion 
    children?: React.ReactNode;
};


// #region Card without inner React component(s): type 1: an article/a section/an aside/a figure; type 2: a div

// #region Type 1: an article/a section/an aside/a figure
/* Source of generic interface for an article/a section/an aside/a figure (HTMLAttributes<HTMLElement>):
node_modules/@types/react/ts5.0/index.d.ts */
type extendedGenericInterfaceForNonFocusCardByMariePierreLessard = HTMLAttributes<HTMLElement> 
    & NonFocusableCardInterfaceByMariePierreLessard;

export const CardWithArticleByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardByMariePierreLessard)=> {

    return (
        <article {...rest}>
            {children}
        </article>
    );
};

export const CardWithSectionByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardByMariePierreLessard)=> {

    return (
        <section {...rest}>
            {children}
        </section>
    );
};

export const CardWithAsideByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardByMariePierreLessard)=> {

    return (
        <aside {...rest}>
            {children}
        </aside>
    );
};

/* Maybe TO DO (figure element): 
Type for card with figure in at least 2 parts (children and figcaption), but the 1-part version might be enough 
(ideas: figcaption plus img and/or sth else, probably using figcaption element (or component) and a children placeholder) 
*/
export const CardWithFigureByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardByMariePierreLessard)=> {

    return (
        <figure {...rest}>
            {children}
        </figure>
    );
};
// #endregion Type 1: an article/a section/an aside/a figure

// #region Type 2: a div
/* Source of generic interface for a div (HTMLAttributes<HTMLDivElement>):
node_modules/@types/react/ts5.0/index.d.ts */
type extendedGenericInterfaceForNonFocusCardWithDivByMariePierreLessard = HTMLAttributes<HTMLDivElement> 
    & NonFocusableCardInterfaceByMariePierreLessard;

export const CardWithDivByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardWithDivByMariePierreLessard)=> {

    return (
        <div {...rest}>
            {children}
        </div>
    );
};

// #endregion Type 2: a div

// #region Type 3: a form (maybe TO DO: add to this component because it is not value-added at this point; same as HTML form element; it would make more sense to have such a component if there were built-in buttons, etc.)
type extendedGenericInterfaceForNonFocusCardWithFormByMariePierreLessard = FormHTMLAttributes<HTMLFormElement>
    & NonFocusableCardInterfaceByMariePierreLessard;

export const CardWithFormByMariePierreLessard = (
    { children, ...rest }:
    extendedGenericInterfaceForNonFocusCardWithFormByMariePierreLessard)=> {

    return (
        <form {...rest}>
            {children}
        </form>
    );
};
// #endregion Type 3: a form

// #endregion Card without inner React component(s): an article/a section/an aside/a figure


// #region Card with 2 inner React component(s): type 1: an article/a section/an aside; type 2: a div

// #region Type 1: an article/a section/an aside
/* This region is based on the card without inner React components  */
type extendedGenericInterfaceForNonFocusCard2PartsByMariePierreLessard =
    HTMLAttributes<HTMLElement> & NonFocusableCardInterfaceByMariePierreLessard
    & cardBodyInterfaceByMariePierreLessard
    & cardFooterInterfaceByMariePierreLessard;
/* Maybe TO DO: I thought of using the following, but the props passed from App() thanks to the rest parameter 
might not always be appropriate to use in both the card parent and the child (header/heading, body or footer).
I don't think that this option would make the styling easy or the app maintainable, and it could cause problems: 
& extendedGenericInterfaceForHeadingElByMariePierreLessard
& extendedGenericInterfaceForCardBodyByMariePierreLessard
& extendedGenericInterfaceForCardFooterByMariePierreLessard;
*/

export const Card2PartsWithArticleByMariePierreLessard = (
    { bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard2PartsByMariePierreLessard)=> {

    return (
        <article {...rest}>
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </article>
    );
};

export const Card2PartsWithSectionByMariePierreLessard = (
    { bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard2PartsByMariePierreLessard)=> {

    return (
        <section {...rest}>
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </section>
    );
};

export const Card2PartsWithAsideByMariePierreLessard = (
    { bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard2PartsByMariePierreLessard)=> {

    return (
        <aside {...rest}>
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </aside>
    );
};
// #endregion Type 1: an article/a section/an aside

// #region Type 2: a div 
/* Source of generic interface for a div (HTMLAttributes<HTMLDivElement>):
node_modules/@types/react/ts5.0/index.d.ts */
type extendedGenericInterfaceForNonFocusCard2PartsInDivByMariePierreLessard = HTMLAttributes<HTMLDivElement>
    & NonFocusableCardInterfaceByMariePierreLessard
    & cardBodyInterfaceByMariePierreLessard
    & cardFooterInterfaceByMariePierreLessard;

export const Card2PartsWithDivByMariePierreLessard = (
    { bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard2PartsInDivByMariePierreLessard)=> {

    return (
        <div {...rest}>
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </div>
    );
};
// #endregion Type 2: a div
// #endregion Card with 2 inner React component(s): an article/a section/an aside


// #region Card with 3 inner React component(s): an article/a section/an aside
/* This region is based on the card without inner React components  */

// #region Type 1: an article/a section/an aside/a figure
type extendedGenericInterfaceForNonFocusCard3PartsByMariePierreLessard =
    HTMLAttributes<HTMLElement> & NonFocusableCardInterfaceByMariePierreLessard
    & headingElInterfaceByMariePierreLessard
    & cardBodyInterfaceByMariePierreLessard
    & cardFooterInterfaceByMariePierreLessard;
/* Maybe TO DO: I thought of using the following, but the props passed from App() thanks to the rest parameter 
might not always be appropriate to use in both the card parent and the child (header/heading, body or footer).
I don't think that this option would make the styling easy or the app maintainable, and it could cause problems: 
& extendedGenericInterfaceForHeadingElByMariePierreLessard
& extendedGenericInterfaceForCardBodyByMariePierreLessard
& extendedGenericInterfaceForCardFooterByMariePierreLessard;
*/

export const Card3PartsWithArticleByMariePierreLessard = (
    { headingNr, headingText, bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard3PartsByMariePierreLessard)=> {

    return (
        <article {...rest}>
            <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </article>
    );
};

export const Card3PartsWithSectionByMariePierreLessard = (
    { headingNr, headingText, bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard3PartsByMariePierreLessard)=> {

    return (
        <section {...rest}>
            <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </section>
    );
};

export const Card3PartsWithAsideByMariePierreLessard = (
    { headingNr, headingText, bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard3PartsByMariePierreLessard)=> {

    return (
        <aside {...rest}>
            <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </aside>
    );
};
// #endregion Type 1: an article/a section/an aside

// #region Type 2: a div
/* Source of generic interface for a div (HTMLAttributes<HTMLDivElement>):
node_modules/@types/react/ts5.0/index.d.ts */
type extendedGenericInterfaceForNonFocusCard3PartsInDivByMariePierreLessard = HTMLAttributes<HTMLDivElement>
    & NonFocusableCardInterfaceByMariePierreLessard
    & headingElInterfaceByMariePierreLessard
    & cardBodyInterfaceByMariePierreLessard
    & cardFooterInterfaceByMariePierreLessard;

export const Card3PartsWithDivByMariePierreLessard = (
    { headingNr, headingText, bodyContent, footerContent, children, ...rest }:
    extendedGenericInterfaceForNonFocusCard3PartsInDivByMariePierreLessard)=> {

    return (
        <aside {...rest}>
            <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
            <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                {children}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard footerContent={footerContent} />
        </aside>
    );
};
    



// #endregion Type 2: a div
// #endregion Card with 3 inner React component(s): an article/a section/an aside

// #endregion Card itself (container that is NOT a link) (organism) (region includes variants)

