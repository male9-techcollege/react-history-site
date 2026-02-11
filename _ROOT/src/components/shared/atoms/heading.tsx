/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

// #region Heading (just h1-6, i.e. atom): maybe TO DO: hgroup element (molecule)? 
/* Successful tests: 
- default is displayed or visible in the console if props are missing 
- the switch statement works when a heading level is provided
- className can be used to add styling
*/
import type { HTMLAttributes } from "react";

export interface headingElInterfaceByMariePierreLessard {
    headingNr: number;
    headingText: string;
};

type extendedGenericInterfaceForHeadingElByMariePierreLessard = HTMLAttributes<HTMLHeadingElement> & headingElInterfaceByMariePierreLessard;

/* Til læreren: jeg kaldte ikke dette komponent CardHeader, da et header-element skal have flere børn ifølge HTML-standarden,
og da opgaven kun krævede et element med props, dvs. et heading-element. Da de forskellige props beskrevet i instrukserne
skifter navn i instrukserne (selvom det ikke fungerer sådan i kodningen), tænkte jeg at navnet på komponenter nok ikke var
særlig vigtigt! */
export const HeadingElByMariePierreLessard = (
    { headingNr, headingText, ...rest }:
    extendedGenericInterfaceForHeadingElByMariePierreLessard)=> {

    // #region Sources and notes on experiments
    /* I doubted that this could work because converting strings to HTML tags might not be allowed in React,
    even though it is possible to use template strings with innerHTML in vanilla JS. 
    I quickly gave up on that idea because the component needs to accept props, e.g. for class names. 
    let headingNrWithFallbackByMariePierreLessard = headingNr || 3;
    let headingOpeningTagByMariePierreLessard = `<h${headingNrWithFallbackByMariePierreLessard}>`;
    let headingClosingTagByMariePierreLessard = `</h${headingNrWithFallbackByMariePierreLessard}>`;
    */
    /* Source for which conditional expression or statement to use in React components:
    - ternary operator versus
    - a switch statement (combined with an immediately-invoked function expression (IIFE)) versus 
    - if
        or
    - if... else 
        or
    - if... else if... else 
    Sometimes, the latter just won't work!
    https://react-cn.github.io/react/tips/if-else-in-JSX.html    

    The assignment's instructions are hinting that a switch statement is the most appropriate in this casea
    (bonus: a default option = placeholder that indicates the absence of content).
    The default case of a switch statement can also address the issue that a user could enter a number 
    that is inferior or superior to 1-6; this would cause an error since there are only 6 HTML headings).
    I can also use switch for the card body and footer (a simpler situation). 

    The example in the React documentation (on which the following switch statement is based) omitted the use of break;
    When I added break; I got an unreachable code error, and I wondered why. It's a TypeScript error:

    "Unreachable code
    Statements guaranteed to not be executed at run time are now correctly flagged as unreachable code errors. For instance, 
    statements following unconditional return, throw, break or continue statements are considered unreachable."
    https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html

    "No, you don't need break after return, technically anything after return is unreachable code. – 
        user184994
        CommentedNov 19, 2017 at 7:25 (...)
    return terminates your function, so the code won't continue executing (and potentially falling through to the next case block). 
    There's no point in using break in such a situation. (...)
        answered Nov 19, 2017 at 7:27 
        Mureinik"
    https://stackoverflow.com/questions/47374592/do-i-still-need-to-use-break-after-i-use-return-in-switch-case
    */
    // #endregion Sources and notes on experiments

    return (
        <>
            {(() => {
                switch (headingNr) {
                    case 1:
                        return (
                            <h1 {...rest}>{headingText}</h1>
                        );
                    case 2:
                        return (
                            <h2 {...rest}>{headingText}</h2>
                        );
                    case 3:
                        return (
                            <h3 {...rest}>{headingText}</h3>
                        );
                    case 4:
                        return (
                            <h4 {...rest}>{headingText}</h4>
                        );
                    case 5:
                        return (
                            <h5 {...rest}>{headingText}</h5>
                        );
                    case 6:
                        return (
                            <h6 {...rest}>{headingText}</h6>
                        );
                    default:
                        return (
                            <div {...rest}>Heading level not provided</div>
                        );
                };
            })()}
        </>
    );
};
// #endregion Heading (just h1-6, i.e. atom)

