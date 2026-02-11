/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

import type { HTMLAttributes } from "react";

// #region Card body (can be molecule or an atom) 
/* Successful tests: 
- All alternatives provided by the switch statement were displayed. 
*/

export interface cardBodyInterfaceByMariePierreLessard {
    bodyContent?: string;
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children?: React.ReactNode;
};

//Card body = div
type extendedGenericInterfaceForCardBodyByMariePierreLessard = HTMLAttributes<HTMLDivElement>
    & cardBodyInterfaceByMariePierreLessard;

export const CardBodyByMariePierreLessard = (
    { bodyContent, children, ...rest }:
        extendedGenericInterfaceForCardBodyByMariePierreLessard)=> {

    // #region Reason for the following use of the switch statement and fallback variable as required argument
    /* I want to make sure that the creation of an HTML element happens in every case, in spite of the fact that
    both interface properties are optional. They have to be optional because the user could enter a single line
    (e.g. a short description), a group of HTML lines (e.g. several paragraphs), or both
    (having both is probably a bit lazy, but it could happen). 

    This is hard to accomplish with switch because in the absence of any argument coming into the switch statement,
    the switch that I envisaged would not run, and no element would be created by the component! The option
    switch (true), which was used in sources that I found, would also not run. 

    A fallback comes in handy to make sure that switch will always run, e.g. at the beginning of development/production,
    before any optional argument is provided.
    */
    // #endregion 
    /* DO NOT MOVE/REMOVE UNLESS THERE IS AT LEAST ONE REQUIRED PROP IN THE INTERFACE */
    let bodyContentFallbackByMariePierreLessard = "No description provided";

    // #region Sources and notes on experiments
    /* Source according to which operators (e.g. logical operators) can be used
    either between parentheses after switch
    or as a case to be verified:
    "Can a switch statement have multiple parameters? (...)
    We can also reverse the script by using the multiple parameters in the switch instead of in the case:"
    https://www.codecademy.com/forum_questions/5473e36c282ae35e12000630 
    
    "The switch (true) pattern as an alternative to if...else is especially useful if you want to utilize the fall-through 
    behavior." https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
    (Not the case here because I have to return something, i.e. break out, in every case.)

    Experiments:
    --FAIL(S)--
    - When I had 
      switch (bodyContentFallbackByMariePierreLessard || bodyContent || children)
      only the fallback was displayed even though I provided the props. It's because the OR operator is exclusive.
      There is no AND/OR operator. The conditions must be read in order, too!
    --PARTIAL SUCCESS(ES)--
    - With 
      switch (undefined) 
      I can show the bodyContent or the children, but not both!
      This being said, TypeScript objects to the parameter being undefined.
    */
    // #endregion Sources and notes on experiments
    return (
        <>
            {(() => {
                switch (
                (bodyContentFallbackByMariePierreLessard && bodyContent && children) ||
                (bodyContentFallbackByMariePierreLessard && bodyContent) ||
                (bodyContentFallbackByMariePierreLessard && children)
                ) {
                    case (bodyContent && children):
                        return (
                            <div {...rest}>
                                {bodyContent}
                                {children}
                            </div>
                        );
                    case bodyContent:
                        return (
                            <div {...rest}>
                                {bodyContent}
                            </div>
                        );
                    case children:
                        return (
                            <div {...rest}>
                                {children}
                            </div>
                        );
                    default:
                        return (
                            <div {...rest}>
                                {bodyContentFallbackByMariePierreLessard}
                            </div>
                        );
                };
            })()}
        </>
    );
};
// #endregion Card body

// #region Card footer (can be molecule or an atom) 

export interface cardFooterInterfaceByMariePierreLessard {
    footerContent?: string;
    /* children is a reserved word in React! The app will break if I changed it.
    I found that out in the modal assignment (see folder react-pros-and-cons). Source: Kasper. */
    children?: React.ReactNode;
};

type extendedGenericInterfaceForCardFooterByMariePierreLessard = HTMLAttributes<HTMLElement>
    & cardFooterInterfaceByMariePierreLessard;

export const CardFooterByMariePierreLessard = (
    { footerContent, children, ...rest }:
        extendedGenericInterfaceForCardFooterByMariePierreLessard)=> {

    // #region Reason for the following use of the switch statement and fallback variable as required argument
    /* I want to make sure that the creation of an HTML element happens in every case, in spite of the fact that
    both interface properties are optional. They have to be optional because the user could enter a single line
    (e.g. a short description), a group of HTML lines (e.g. several paragraphs), or both
    (having both is probably a bit lazy, but it could happen).

    This is hard to accomplish with switch because in the absence of any argument coming into the switch statement,
    the switch that I envisaged would not run, and no element would be created by the component! The option
    switch (true), which was used in sources that I found, would also not run.

    A fallback comes in handy to make sure that switch will always run, e.g. at the beginning of development/production,
    before any optional argument is provided.
    */
    // #endregion 
    /* DO NOT MOVE/REMOVE UNLESS THERE IS AT LEAST ONE REQUIRED PROP IN THE INTERFACE */
    let footerContentFallbackByMariePierreLessard = "Footer contents not provided";

    return (
        <>
            {(() => {
                switch (
                (footerContentFallbackByMariePierreLessard && footerContent && children) ||
                (footerContentFallbackByMariePierreLessard && footerContent) ||
                (footerContentFallbackByMariePierreLessard && children)
                ) {
                    case (footerContent && children):
                        return (
                            <footer {...rest}>
                                {footerContent}
                                {children}
                            </footer>
                        );
                    case footerContent:
                        return (
                            <footer {...rest}>
                                {footerContent}
                            </footer>
                        );
                    case children:
                        return (
                            <footer {...rest}>
                                {children}
                            </footer>
                        );
                    default:
                        return (
                            <footer {...rest}>
                                {footerContentFallbackByMariePierreLessard}
                            </footer>
                        );
                };
            })()}
        </>
    );
};
// #endregion Card footer
