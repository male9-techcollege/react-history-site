/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

/* The code of these card components and their inner components is based on: 
- the extensive sources provided for my image component (see file atoms/img-el.tsx); 
- my relatively extensive research on generic interface to use with specific HTML elements 
  (see region of the same name in file main-el.tsx);
- switch-codelab 
- for if... else...: react-component-codealong-med-kasper + my implementation of that in react-pros-and-cons, dynamic-list.tsx
- see also sources for way to fold regions in .jsx files and for 
  concatenation/combination of CSS classes in React in the file App.tsx.
*/

import type { AnchorHTMLAttributes } from "react";
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

// #region Anchor Card itself (the container) (an organism) (region includes variants)

/* This interface is used by multiple components in this region */
interface anchorCardInterfaceByMariePierreLessard {
    href: string;
    target?: string;
    rel?: string;
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


// #region Card without inner React component(s): an anchor element with an article in it (2 versions: external and internal links)
/* Successful tests: 
- defaults are displayed or visible in the console if props are missing 
- className can be used to add styling
*/

// #region Research that was not immediately useful, but could turn out to help
/* The StackOverflow Q&A at https://stackoverflow.com/questions/55892409/how-to-extend-html-attributes-in-react-with-typescript
indicates that the full type names are in the format
React.AnchorHTMLAttributes<HTMLAnchorElement>
and not
AnchorHTMLAttributes<HTMLAnchorElement>
But now, I am not sure that I need that... I am keeping the source just in case.

In case typing errors occur: the following could solve the issues.

"What is React Router?
React Router is a library that provides routing capabilities for React applications.
Routing means handling navigation between different views.
React Router is the standard routing library for React applications."
https://www.w3schools.com/react/react_router.asp

"Link Component vs. Anchor Tag (href) in ReactJS and NextJS
Husnain Ashfaq (...)
Jun 1, 2024 (...)
### 6. Best Practices

- **Use Anchor Tags for External Links**: For links that navigate to external sites, continue using anchor tags.
- **Use Link Components for Internal Navigation**: Within ReactJS or NextJS applications, prefer using their respective `Link` components for internal navigation.
- **Preloading and Performance**: Take advantage of preloading features in `Link` components to enhance performance.
- **SEO Considerations**: Ensure your internal links are SEO-friendly by using `Link` components appropriately in NextJS.
- **Accessibility**: Ensure that both anchor tags and `Link` components are accessible by providing meaningful link text and using semantic HTML."
https://medium.com/@husnain.ashfaq3939/link-component-vs-anchor-tag-href-in-reactjs-and-nextjs-d73c406c41be */
// #endregion Research that was not immediately useful, but could turn out to help

type extendedGenericInterfaceForCardWithLinkByMariePierreLessard = AnchorHTMLAttributes<HTMLAnchorElement>
    & anchorCardInterfaceByMariePierreLessard;

export const CardWithExternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, children, ...rest }:
        extendedGenericInterfaceForCardWithLinkByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "javascript:void(0)";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_blank";
    /* Source 1: good explanation on the security role of noopener when opening a link in a new tab.
    There is a risk of "reverse tabnapping."
    https://linkbuilder.io/rel-noopener-noreferrer 
    
    Source 2: the rel attribute provides information to search engines/crawlers, among other things.
    https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "external noopener";

    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                {children}
            </article>
        </a>
    );
};

export const CardWithInternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, children, ...rest }:
        extendedGenericInterfaceForCardWithLinkByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "#globalFooter";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_self";
    /* The rel attribute provides information to search engines/crawlers, among other things.
    Source: https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "license";

    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                {children}
            </article>
        </a>
    );
};
// #endregion Card without inner React component(s): an anchor element with an article in it


// #region Card with 2 inner React component(s): an anchor element with an article in it (2 versions: external and internal links)
/* This region is based on the card without inner React components  */
type extendedGenericInterfaceForAnchorCard2PartsByMariePierreLessard =
    AnchorHTMLAttributes<HTMLAnchorElement> & anchorCardInterfaceByMariePierreLessard
    & cardBodyInterfaceByMariePierreLessard
    & cardFooterInterfaceByMariePierreLessard;
/* Maybe TO DO: I thought of using the following, but the props passed from App() thanks to the rest parameter 
might not always be appropriate to use in both the card parent and the child (header/heading, body or footer).
I don't think that this option would make the styling easy or the app maintainable, and it could cause problems: 
& extendedGenericInterfaceForHeadingElByMariePierreLessard
& extendedGenericInterfaceForCardBodyByMariePierreLessard
& extendedGenericInterfaceForCardFooterByMariePierreLessard;
*/

export const Card2PartsWithExternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, bodyContent, footerContent, children, ...rest }:
        extendedGenericInterfaceForAnchorCard2PartsByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "javascript:void(0)";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_blank";
    /* Source 1: good explanation on the security role of noopener when opening a link in a new tab.
    There is a risk of "reverse tabnapping."
    https://linkbuilder.io/rel-noopener-noreferrer 
    
    Source 2: the rel attribute provides information to search engines/crawlers, among other things.
    https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "external noopener";

    /* Til læreren: jeg ved godt, at størrelsen på kortenes billeder ikke er responsiv! 
    Det var ikke opgavens formål at bruge tid på det. Som konsekvens gav jeg bare en størrelse, som ikke er helt for stor
    uanset hvad brugerens "view port" er. Det var bare for at vise/teste, at komponentet virker efter hensigten! */
    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                    {children}
                </CardBodyByMariePierreLessard>
                <CardFooterByMariePierreLessard footerContent={footerContent} />
            </article>
        </a>
    );
};

export const Card2PartsWithInternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, bodyContent, footerContent, children, ...rest }:
        extendedGenericInterfaceForAnchorCard2PartsByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "#globalFooter";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_self";
    /* The rel attribute provides information to search engines/crawlers, among other things.
    Source: https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "license";

    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                    {children}
                </CardBodyByMariePierreLessard>
                <CardFooterByMariePierreLessard footerContent={footerContent} />
            </article>
        </a>
    );
};
// #endregion Card with 2 inner React component(s): an anchor element with an article in it


// #region Card with 3 inner React component(s): an anchor element with an article in it (2 versions: external and internal links)
/* This region is based on the card without inner React components  */
type extendedGenericInterfaceForAnchorCard3PartsByMariePierreLessard =
    AnchorHTMLAttributes<HTMLAnchorElement> & anchorCardInterfaceByMariePierreLessard
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

export const Card3PartsWithExternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, headingNr, headingText, bodyContent, footerContent, children, ...rest }:
        extendedGenericInterfaceForAnchorCard3PartsByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "javascript:void(0)";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_blank";
    /* Source 1: good explanation on the security role of noopener when opening a link in a new tab.
    There is a risk of "reverse tabnapping."
    https://linkbuilder.io/rel-noopener-noreferrer 
    
    Source 2: the rel attribute provides information to search engines/crawlers, among other things.
    https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "external noopener";

    /* Til læreren: jeg ved godt, at størrelsen på kortenes billeder ikke er responsiv! 
    Det var ikke opgavens formål at bruge tid på det. Som konsekvens gav jeg bare en størrelse, som ikke er helt for stor
    uanset hvad brugerens "view port" er. Det var bare for at vise/teste, at komponentet virker efter hensigten! */
    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
                <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                    {children}
                </CardBodyByMariePierreLessard>
                <CardFooterByMariePierreLessard footerContent={footerContent} />
            </article>
        </a>
    );
};

export const Card3PartsWithInternalLinkAndArticleByMariePierreLessard = (
    { href, target, rel, headingNr, headingText, bodyContent, footerContent, children, ...rest }:
        extendedGenericInterfaceForAnchorCard3PartsByMariePierreLessard)=> {

    let hrefWithFallbackByMariePierreLessard = href || "#globalFooter";
    /* Source: https://www.w3schools.com/tags/att_a_target.asp */
    let targetWithFallbackByMariePierreLessard = target || "_self";
    /* The rel attribute provides information to search engines/crawlers, among other things.
    Source: https://www.w3schools.com/tags/att_a_rel.asp */
    let relWithFallbackByMariePierreLessard = rel || "license";

    return (
        <a
            href={hrefWithFallbackByMariePierreLessard}
            target={targetWithFallbackByMariePierreLessard}
            rel={relWithFallbackByMariePierreLessard}
            {...rest}
        >
            <article>
                <HeadingElByMariePierreLessard headingNr={headingNr} headingText={headingText} />
                <CardBodyByMariePierreLessard bodyContent={bodyContent}>
                    {children}
                </CardBodyByMariePierreLessard>
                <CardFooterByMariePierreLessard footerContent={footerContent} />
            </article>
        </a>
    );
};
// #endregion Card with 3 inner React component(s): an anchor element with an article in it

// #endregion Anchor card itself (the container) (organism) (region includes variants)

