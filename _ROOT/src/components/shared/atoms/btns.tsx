/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

// import { useCallback } from 'react';
import type { ButtonHTMLAttributes } from "react";
import type { Dispatch, SetStateAction } from "react";

/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region School sources
/* These components are edited versions of the one delivered in assignment 
"Lav en dynamisk knap" (section 2.7, assignment 4)
It was a button to switch between light and dark mode.
There are interesting notes in that assignment's folder, including explanations from Kasper following the assignment delivery.

Sources used:
- ** react-intro-mc-med-kasper: covers pretty much everything needed here: it does include a button component, 
  as well as the use of concatenation for styles (I found a source that shows how this can also be used with CSS/SCSS only,
  not just when one combines Tailwind and CSS/SCSS: 
  https://medium.com/geekculture/using-reacts-state-to-update-css-dynamically-c9b45570340c) 
- react-component-codealong-med-kasper: Interface with prop for inline styling (style= instead of className=)
- react-hook-repetition: component that includes or imports a function and useState (slider)
- react-modal-codealong-med-kasper: modal with wrapper (in div) and burger menu (useState and useEffect with dependency array, 
function to toggle a boolean value and conditional expression inside of return())
- react-router-codealong-med-kasper (how to describe the type of action with Dispatch<A>)
*/
// #endregion School sources
/* Svar fra Kasper:
(Maybe TO DO) 
Funktioner skal i filer til helper (utilities) funktioner, hvis en knap skal modtage forskellige funktioner som prop. 
Det er kun tilstand (states), som skal blive så tæt på komponentet som muligt. 
 */

/* GENERAL BUTTON INTERFACE FOR **VOID FUNCTIONS** that can change **ANY STATE** 
Kasper said that when using TypeScript, it is best to set a type, so this is just a general template 
**without any argument** in the void function. 
(Void function: a function at the end of the call stack if i understand properly;
it doesn't pass arguments to another function)).  
*/
interface multitypeBtnInterfaceByMariePierreLessard {
    type: string; //The type attribute of button element
    children: React.ReactNode; //There needs to be at least a text node present, or the button has nothing on it. Reminder: the value attribute works differently than on an input.
    /* The following is not necessary if I want to avoid putting an argument in the function given in the on-click attribute:
    state: any;
    */
    /* Location of course notes for the action prop and how to define its type depending on the case:
       - react-intro-mc-med-kasper (no parameter)
       - react-modal-codealong-med-kasper (with boolean value as parameter)
       - react-router-codealong-med-kasper (how to describe the type of action with Dispatch<A>)
    */
    action: () => void; 
};

type extendedGenericInterfaceForMultitypeBtnByMariePierreLessard = ButtonHTMLAttributes<HTMLButtonElement>
    & multitypeBtnInterfaceByMariePierreLessard;

export const MultiTypeBtnComponentByMariePierreLessard = (
    { type, children, action, ...rest }:
    extendedGenericInterfaceForMultitypeBtnByMariePierreLessard) => {

    /* From the final version of react-intro-mc-med-kasper:
    onClick={() => action()}
    This button does NOT work in the stopwatch assignment (where it is a reset button) 
    unless I write that (i.e. unless I include parentheses at the end). 
    No argument is sent by this reset button.

    I found a clear explanation for that in the following source: 
    NetNinja, "Full Modern React Tutorial #7: Click Events" on YouTube 

    In a nutshell, 
    onClick={action}
    and
    onClick={() => action()}
    and
    onClick={() => {
        action();
    }}
    are equivalent because the variable "action" and the arrow function are not invoked/called on mounting.
    What is inside of the arrow function is only invoked/called if the arrow function is executed, which is what
    the on-click event listener does.
    The following is invoked on mounting because of the parentheses, which lead to the execution of that function
    as soon as the browser reads the code:
    onClick={action()}
  
    When I include the curly brackets of the arrow function, as follows, I can see why action must be followed by parentheses
    in an arrow function.
    onClick={() => {
        action();
    }}
    If there were no parenthesis, action would look like a variable with some other data type than function. 
    The parentheses are necessary to get the function executed.
    */
        return (
        <button type={type} onClick={() => action()} {...rest} >
            {children}
        </button>
    );
};


/* BUTTON INTERFACE FOR **TOGGLING BOOLEAN STATE** (a void function) */
interface toggleBtnInterfaceByMariePierreLessard {
    type: string; //The type attribute of button element
    children: React.ReactNode; //There needs to be at least a text node present, or the button has nothing on it. Reminder: the value attribute works differently than on an input.
    booleanState: boolean;
    // #region Research and notes about reason for my choice
    /* Research on what Dispatch<SetStateAction<number>> means:
    1. SetStateAction<S> indicates the type of the state created with the useState hook according to file
       node_modules/@types/react/ts5.0/index.d.ts
       S is a placeholder for number, string, boolean, a function, etc.
    2. Dispatch<A> indicates the type of an action performed by a void function, as explained by k.tten on StackOverflow:
       "Dispatch takes an action as a parameter and returns nothing meaningful (void). There are multiple types of actions, 
       and one of them is SetStateAction.
       Remember that useState can take a new state, or a function that takes the previous state and returns the new state.
       So useState's type is actually:
       type UseState<S> = (action: S | ((prevState: S) => S)) => void;"
       https://stackoverflow.com/questions/71324797/react-typescript-what-does-dispatchsetstateactionboolean-stand-for 

       Location of course notes for the action prop and how to define its type depending on the case:
       - react-intro-mc-med-kasper (no parameter)
       - react-modal-codealong-med-kasper (with boolean value as parameter)
       - react-router-codealong-med-kasper (how to describe the type of action with Dispatch<A>)
       Note: using 
       (case: number) => void 
       or 
       (isOpen: boolean) => void 
       appears to be the equivalent of using 
       Dispatch<SetStateAction<number>>
       or
       Dispatch<SetStateAction<boolean>>
       based on the above sources.
       However, is it completely equivalent? If one solution is superior to the other, I assume that it is 
       the type that is pre-defined in React, so it might be best to use that one. 
    */
    // #endregion
    toggleAction: Dispatch<SetStateAction<boolean>>; //A setter function that toggles a boolean state
};

type extendedGenericInterfaceForToggleBtnByMariePierreLessard = ButtonHTMLAttributes<HTMLButtonElement>
    & toggleBtnInterfaceByMariePierreLessard;

export const ToggleBtnComponentByMariePierreLessard = (
    { type, children, booleanState, toggleAction, ...rest }:
        extendedGenericInterfaceForToggleBtnByMariePierreLessard) => {

    /* Source for the use of ! in order to toggle the boolean value created with useState, as in:
    <button type={type} onClick={() => toggleAction(!booleanState)} {...rest} >
        {children}
    </button>
    "How to pass props from child to parent component in React"
    by Bruno
    https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4 

    Kasper said that:
    if one writes handlerFunction(argument) in the onclick attribute without putting it in an arrow function, 
    the function is called even though the user did not click on the button. This only happens if the function takes arguments.
    Solution: just write handlerFunction. 
    Alternatively, use an arrow function: 
    onClick={() => handlerFunction} 
    Source: react-intro-mc-med-kasper
    
    Kasper said that it is a lot easier to define the action outside of the button component
    and pass it as a prop.
    Result: 
    onClick={toggleAction}
    Maybe TO DO (if useful in assignment): implement that in some use of the components for replacing 
    numbers and strings.
    Indeed, that is not how I already designed my interface for the toggle button, which worked in the colour-mode-switching 
    and stopwatch assignments. My interface requires a boolean value to be passed as a prop, and it is the button's event 
    listener that does the toggling. 
    */
    return (
        <button type={type} onClick={() => toggleAction(!booleanState)} {...rest} >
            {children}
        </button>
    );
};


/* Maybe TO DO: the following buttons for updating numeric values and text, which were not tested. */

interface numericStateBtnInterfaceByMariePierreLessard {
    type: string; //The type attribute of button element
    children: React.ReactNode; //There needs to be at least a text node present, or the button has nothing on it. Reminder: the value attribute works differently than on an input.
    // #region Research and notes about reason for my choice
    /* Research on what Dispatch<SetStateAction<number>> means:
    1. SetStateAction<S> indicates the type of the state created with the useState hook according to file
       node_modules/@types/react/ts5.0/index.d.ts
       S is a placeholder for number, string, boolean, a function, etc.
    2. Dispatch<A> indicates the type of an action performed by a void function, as explained by k.tten on StackOverflow:
       "Dispatch takes an action as a parameter and returns nothing meaningful (void). There are multiple types of actions, 
       and one of them is SetStateAction.
       Remember that useState can take a new state, or a function that takes the previous state and returns the new state.
       So useState's type is actually:
       type UseState<S> = (action: S | ((prevState: S) => S)) => void;"
       https://stackoverflow.com/questions/71324797/react-typescript-what-does-dispatchsetstateactionboolean-stand-for 

       As a consequence, the following type description means that setCount is the action performed by a setter function
       that updates a numeric state.

       Location of course notes for the action prop and how to define its type depending on the case:
       - react-intro-mc-med-kasper (no parameter)
       - react-modal-codealong-med-kasper (with boolean value as parameter)
       - react-router-codealong-med-kasper (how to describe the type of action with Dispatch<A>)
       Note: using 
       (case: number) => void 
       or 
       (isOpen: boolean) => void 
       appears to be the equivalent of using 
       Dispatch<SetStateAction<number>>
       or
       Dispatch<SetStateAction<boolean>>
       based on the sources above.
       However, is it completely equivalent? If one solution is superior to the other, I assume that it is 
       the type that is pre-defined in React, so it might be best to use that one. 
    */
    // #endregion
    numericState: number;
    updateNAction: Dispatch<SetStateAction<number>>; //A setter function that replaces a numeric value, e.g. in a counter (correct: see node_modules/@types/react/ts5.0/index.d.ts)
};

type extendedGenericInterfaceForNumericStateBtnByMariePierreLessard = ButtonHTMLAttributes<HTMLButtonElement>
    & numericStateBtnInterfaceByMariePierreLessard;

export const NumericStateBtnComponentByMariePierreLessard = (
    { type, children, numericState, updateNAction, ...rest }:
        extendedGenericInterfaceForNumericStateBtnByMariePierreLessard) => {

    /* Kasper said that it is a lot easier to define the action outside of the button component
    and pass it as a prop.
    Result: 
    onClick={updateNAction}
    However, unless I write the following, I get an error, e.g. an argument is expected.
    onClick={() => updateNAction(numericState)}
    */
    return (
        <button type={type} onClick={() => updateNAction(numericState)} {...rest} >
            {children}
        </button>
    );
};


interface stringStateBtnInterfaceByMariePierreLessard {
    type: string; //The type attribute of button element
    children: React.ReactNode; //There needs to be at least a text node present, or the button has nothing on it. Reminder: the value attribute works differently than on an input.
    stringState: string; //This will only work if a single string is replaced. If multiple strings need to be replaced (e.g. by a reset button), I think that the type is an array of strings. I used the multi-type button to reset, and it works fine.
    updateSAction: Dispatch<SetStateAction<string>>; //A setter function that replaces a string (I guessed that it would work in the same way as with a state with type number; Kasper later used it in react-wallywood-codealong-med-kasper)
};

type extendedGenericInterfaceForStringStateBtnByMariePierreLessard = ButtonHTMLAttributes<HTMLButtonElement>
    & stringStateBtnInterfaceByMariePierreLessard;

export const StringStateBtnComponentByMariePierreLessard = (
    { type, children, stringState, updateSAction, ...rest }:
        extendedGenericInterfaceForStringStateBtnByMariePierreLessard) => {

    // #region Sources and various notes

// Maybe TO DO: reuse these comments in a parent component when I use this button or the one with a numeric state. 

/* Source for the use of ! in order to toggle the boolean value created with useState:
"How to pass props from child to parent component in React"
by Bruno
https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4 
 
When the following function was in App(), until I used useCallback, there was an infinite loop when I accessed the page. 
Kasper said that it's because I put the function in useEffect, which is the wrong thing to do, 
and that I wasn't supposed to use the useEffect hook at all!

From the sources below, I had (mis)understood/inferred that this has to do with how the setter's callback in a child component
is re-rendered every time the parent is re-rendered. This can cause problems like an infinite loop on top of the fact that 
the state controlled by the setter is reset by the re-rendering (as we learned in class) 
unless the information about the state is stored somewhere. That is what useCallback does.
Kasper said that the state of the children isn't ALWAYS reset when rerendering. It depends.
He also said that useCallback solves problems that could be solved by making improving the code, e.g. by simplifying 
the logic and making it more effective. He doesn't agree with the Hygraph.com article below. 

const toggleColourModeByMariePierreLessard = useCallback(() => {
    setColourModeByMariePierreLessard(!colourModeByMariePierreLessard);
    console.log(colourModeByMariePierreLessard);
}, [colourModeByMariePierreLessard]);

Sources for the use of the useCallback hook: 

"use the useCallback hook, which makes sure that the function you pass as a callback to the child component remains stable 
across renders, preventing unnecessary re-renders and improving performance."
https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4

I probably encountered the 1st problem described in the citation below when I did react-joke-fetcher, even though the fix
was not to use the useCallback hook.
"Stale closures
Callback functions can sometimes capture outdated values from their previous value, leading to bugs that are difficult 
to track and fix. (...)
useCallback() is a part of the built-in React Hooks that optimizes the performance of React applications by preventing 
unnecessary re-renders of components. It achieves this through memoizing callback functions, ensuring that they are only 
recreated when the dependency array changes.
Syntax and parameters (...)
The useCallback() Hook takes two arguments:
1. Callback function: This is the first argument, and it represents the function to memorize (remember).
2. Dependency array: This second argument is an array of dependencies that determine when the callback function should be 
recreated. If any value in this array changes between renders, the callback function is recreated. (...)
This means that as long as the dependencies don't change, the exact same function instance is returned every time 
the component re-renders. (...)
When to use useCallback()
Here are some scenarios where using useCallback() is particularly beneficial:
- Optimizing performance in lists: When rendering a list of items, you might need to pass a callback to each item. Using 
useCallback() ensures that the same callback instance is passed to each item, preventing unnecessary re-renders.
- When a callback is a dependency in useEffect(): Use useCallback() when the callback is a dependency in a useEffect Hook 
to prevent the effect from running unnecessarily.
- When working with custom Hooks: Use useCallback() to ensure consistent function references when creating custom Hooks 
that return callback functions, especially if these other functions will be used as dependencies in effects.
- Preventing stale closures: When a callback function depends on state or props, using useCallback() helps to ensure 
the function always has the latest values.
- Passing callbacks to child components: If the function references change, the child components may re-render unnecessarily. 
useCallback() helps prevent this by memoizing the function, ensuring it only changes when its dependencies change."
https://hygraph.com/blog/react-usecallback-a-complete-guide
*/
/* Experiments to understand puzzling behaviour (in dynamic-button assignment):

The button (from assignment "Lav en dynamisk knap" (section 2.7, assignment 4)) 
works perfectly fine: it changes the colour mode every time, also on the first click on the button.
However, the boolean value printed with the following is not the one that I expected. 

When this is in the scope of the button component, I get the following result whether or not I use the useCallback hook:
the first time I click on the button, the boolean value is false (I can see that printed in the console). The second time,
it is true. Why? Indeed, the toggle action (toggleAction(!theme);) is supposed to turn the initial falsy value of theme 
into a truthy value. 
     
Tests:
1. If I comment toggleAction(!theme); out, false is still printed to the console on the first click on the button.
   Since there is no toggle function, subsequent clicks also print the word false. This shows that the value of the theme
   argument, passed from App() is the initial false value defined by useState in App().
2. If I remove  theme  from the dependency array of useCallback, the toggle stops working. 
   Printed text is "Boolean value: false" at each click.
3. Probable reason: this doesn't log the value of theme after it got changed by the setter. It logs the initial value,
   even though the line 
   console.log("Boolean value: ", theme);
   comes after it.
*/
/* In assignment about dynamic button, this did print the boolean value to the console: 
toggleAction(!booleanState);
console.log("Boolean value: ", booleanState);
*/
/* 
const eventHandlerByMariePierreLessard = () => {
    
};
 */
 // #endregion Sources and various notes 

    return (
        <button type={type} onClick={() => updateSAction(stringState)} {...rest} >
            {children}
        </button>
    );
};
