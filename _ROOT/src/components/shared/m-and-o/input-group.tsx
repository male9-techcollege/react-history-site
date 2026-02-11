/* Source of library components, incl. course notes:
react-gallery-wrapper
*/
/* Sources:
- This file contains part of exercise 1 from section 3.4: "Valider input" (see folder/repo react-form,
in which I created a single input with validation for a password). 
- I largely reused my validations from GF2
- react-wallywood-codealong-med-kasper
*/
import type { HTMLAttributes, LabelHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, Dispatch, SetStateAction } from "react";
import {
    specialCharTestByMariePierreLessard,
    digitTestByMariePierreLessard,
    validatePhoneNoByMariePierreLessard,
    validateEmailByMariePierreLessard,
    validateMsgByMariePierreLessard
} from "../../../helpers/validations";

/* Maybe TO DO (or just good to know): 
"5. useId Hook for Unique IDs
The useId hook generates unique, stable IDs on both the server and client, addressing a common issue when handling unique keys 
across server and client renders.
This is especially useful for accessibility and forms where unique identifiers are required.
import { useId } from 'react';

function Form() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>Name:</label>
      <input id={`${id}-name`} type="text" />
    </div>
  );
}"
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0
*/

// #region Inputs that contain a string
interface controlledInputGroupForStringInterfaceByMariePierreLessard {
    state: string;
    action: Dispatch<SetStateAction<string>>;
    /* Note: I had to make type optional, or I got an error when setting the type inside of components themselves
    (so that I could slip from setting the type with a prop in a parent/ancestor). The type can often be set in advance
    because it goes with ready-made validations inside of the components.
    */
    type?: "password" | "text" | "tel" | "email" | "url" | "hidden";
    labelText?: string;
    /* Initial value/text on button or placeholder + text of accompanying label, if any */
    value: string; //This is used by the setter in order to obtain a controlled input, so that prop is mandatory.
    placeholder?: string;
    /* Name attribute for server and association with label */
    for_id_name: string;
    /* HTML5 validation */
    minLength: number;
    maxLength: number;
    /* Ideally, HTML5 validation with pattern should be mandatory, 
    but assignments don't always require me to have a regex for all inputs (or just one regex for one input). */
    pattern?: string;
    autoComplete: "on" | "off";
};

type extendedGenericInterfaceForInputGroupForStringByMariePierreLessard = HTMLAttributes<HTMLDivElement>
    & InputHTMLAttributes<HTMLInputElement>
    & LabelHTMLAttributes<HTMLLabelElement>
    & controlledInputGroupForStringInterfaceByMariePierreLessard;

/* The instructions on Moodle for exercise 1 in section 3.4 contain an example of a component created with a function expression
rather than a function, which is what I initially used in my budding library (I changed that now). 
Kasper says that there is no difference. 
Heinz says that he prefers function expressions because in an app with a lot of components (or a library where only a few
components are used), the hoisting of functions would use a lot of memory for nothing. Of course, a function expression has 
to be defined before it is used, but the importation of components is always done on top of the file where the component
is used, so React developers don't need to worry about the sequence.
*/
export const ControlledInputForPasswordByMariePierreLessard = (
    { state, action, labelText, placeholder, value, for_id_name, minLength, maxLength, pattern, autoComplete, ...rest }:
        extendedGenericInterfaceForInputGroupForStringByMariePierreLessard) => {

    /* When I tried to wrap the conditional expression with a ternary operator in an arrow function,
    an error was thrown when I entered the view code in a HTML element (p, div, etc.). The error stemmed from 
    the interface of these elements in React. They could not receive a function as a child. 
    I was surprised that this work even though this is a conditional expression (a kind of function).
    Kasper said that the ternary operator is special. You can use it like this, but you can't use the 
    if...  else if... else 
    syntax right after the equal sign.  */
    const errorMsgByMariePierreLessard =
        state.trim() === ""
            || state.length < minLength
            || state.length > maxLength
            || !specialCharTestByMariePierreLessard(state)
            || !digitTestByMariePierreLessard(state)
            ? `Your entry must contain at least one digit and one special character and be between ${minLength} and ${maxLength} long.`
            : "";

    /* In React, htmlFor represents the for attribute in HTML. Source: Moodle and Kasper. */
    return (
        <div {...rest}>
            <label htmlFor={for_id_name}>{labelText}</label>
            <input
                onChange={(event) => action(event.target.value)}
                type="password"
                value={state}
                placeholder={placeholder}
                id={for_id_name}
                name={for_id_name}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                autoComplete={autoComplete}
            />
            {/* This means:
                If an error message exists, then run the conditional expression stored in the constant
                errorMsgByMariePierreLessard; otherwise, display nothing.
                 */}
            <span>{errorMsgByMariePierreLessard ? errorMsgByMariePierreLessard : ""}</span>
        </div>
    );
};

export const ControlledInputForStringByMariePierreLessard = (
    { state, action, type, labelText, placeholder, value, for_id_name, minLength, maxLength, pattern, autoComplete, ...rest }:
        extendedGenericInterfaceForInputGroupForStringByMariePierreLessard) => {

    /* This validation could work for type text, type hidden, type url, ... 
    so this is a generic input component. */
    const errorMsgByMariePierreLessard =
        state.trim() === ""
            || state.length < minLength
            || state.length > maxLength
            ? `Your entry must be between ${minLength} and ${maxLength} long.`
            : "";

    return (
        <div {...rest}>
            <label htmlFor={for_id_name}>{labelText}</label>
            <input
                onChange={(event) => action(event.target.value)}
                type={type}
                value={state}
                placeholder={placeholder}
                id={for_id_name}
                name={for_id_name}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                autoComplete={autoComplete}
            />
            <span>{errorMsgByMariePierreLessard ? errorMsgByMariePierreLessard : ""}</span>
        </div>
    );
};

export const ControlledInputForPhoneByMariePierreLessard = (
    { state, action, labelText, placeholder, value, for_id_name, minLength, maxLength, pattern, autoComplete, ...rest }:
        extendedGenericInterfaceForInputGroupForStringByMariePierreLessard) => {

    const errorMsgByMariePierreLessard =
        /* I had trouble making the regex work. Experimentation showed that these verifications are done in sequence. */
        state.trim() === ""
            || state.length < minLength
            || state.length > maxLength
            || !validatePhoneNoByMariePierreLessard(state)
            ? "The phone number is invalid."
            : "";

    return (
        <div {...rest}>
            <label htmlFor={for_id_name}>{labelText}</label>
            <input
                onChange={(event) => action(event.target.value)}
                type="tel"
                value={state}
                placeholder={placeholder}
                id={for_id_name}
                name={for_id_name}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                autoComplete={autoComplete}
            />
            <span>{errorMsgByMariePierreLessard ? errorMsgByMariePierreLessard : ""}</span>
        </div>
    );
};

export const ControlledInputForEmailByMariePierreLessard = (
    { state, action, labelText, placeholder, value, for_id_name, minLength, maxLength, pattern, autoComplete, ...rest }:
        extendedGenericInterfaceForInputGroupForStringByMariePierreLessard) => {

    const errorMsgByMariePierreLessard =
        /* I had trouble making the regex work. Experimentation showed that these verifications are done in sequence. */
        state.trim() === ""
            /* Example of length range: 6 to 255 characters */
            || state.length < minLength
            || state.length > maxLength
            || !validateEmailByMariePierreLessard(state)
            ? "The e-mail address is invalid."
            : "";

    return (
        <div {...rest}>
            <label htmlFor={for_id_name}>{labelText}</label>
            <input
                onChange={(event) => action(event.target.value)}
                type="email"
                value={state}
                placeholder={placeholder}
                id={for_id_name}
                name={for_id_name}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                autoComplete={autoComplete}
            />
            <span>{errorMsgByMariePierreLessard ? errorMsgByMariePierreLessard : ""}</span>
        </div>
    );
};
// #endregion Inputs that contain a string


// #region On-off inputs (radio buttons and checkboxes)
interface controlledInputGroupForRadioOrCheckInterfaceByMariePierreLessard {
    /* The state had to be a string in order to display a message about the selection
    made with this controlled input. This doesn't affect the form submission. It's just for rendering. */
    state: string;
    action: Dispatch<SetStateAction<string>>;
    type: "radio" | "checkbox";
    labelText?: string;
    value: string; 
    /* Name attribute for server and association with label */
    for_id: string;
    name: string;
};

type extendedGenericInterfaceForInputGroupForRadioOrCheckByMariePierreLessard = HTMLAttributes<HTMLSpanElement>
    & InputHTMLAttributes<HTMLInputElement>
    & LabelHTMLAttributes<HTMLLabelElement>
    & controlledInputGroupForRadioOrCheckInterfaceByMariePierreLessard;


export const ControlledInputForRadioOrCheckByMariePierreLessard = (
    { state, action, type, labelText, value, for_id, name, ...rest }:
    extendedGenericInterfaceForInputGroupForRadioOrCheckByMariePierreLessard) => {

    return (
        <span {...rest}>
            <input
                onChange={() => action(state)}
                type={type}
                value={value}
                id={for_id}
                name={name}
            />
            <label htmlFor={for_id}>{labelText}</label>
        </span>
    );
};
    
// #endregion On-off inputs (radio buttons and checkboxes)


interface controlledTextAreaGroupInterfaceByMariePierreLessard {
    /* It looks like the type is still string when there are new lines. I looked up all data types in JS.
    When the entry is displayed in real time, paragraph marks become spaces, and multiple spaces show as a single space. */
    state: string;
    action: Dispatch<SetStateAction<string>>;
    labelText?: string;
    value: string; //This is used by the setter in order to obtain a controlled input, so that prop is mandatory.
    placeholder?: string;
    /* Name attribute for server and association with label */
    for_id_name: string;
    /* HTML5 validation */
    minLength: number;
    maxLength: number;
};

type extendedGenericInterfaceForTextAreaGroupByMariePierreLessard = HTMLAttributes<HTMLDivElement>
    & TextareaHTMLAttributes<HTMLTextAreaElement>
    & LabelHTMLAttributes<HTMLLabelElement>
    & controlledTextAreaGroupInterfaceByMariePierreLessard;

export const ControlledTextAreaByMariePierreLessard = (
    { state, action, labelText, value, placeholder, for_id_name, minLength, maxLength, ...rest }:
    extendedGenericInterfaceForTextAreaGroupByMariePierreLessard) => {

    const errorMsgByMariePierreLessard =
        state.trim() === ""
            || state.length < minLength
            || state.length > maxLength
            || !validateMsgByMariePierreLessard(state)
            ? `Your entry must be between ${minLength} and ${maxLength} long. Only certain special characters are allowed.`
            : "";

    return (
        <div {...rest}>
            <label htmlFor={for_id_name}>{labelText}</label>
            <textarea
                onChange={(event) => action(event.target.value)}
                value={state}
                placeholder={placeholder}
                id={for_id_name}
                name={for_id_name}
                minLength={minLength}
                maxLength={maxLength}
            ></textarea>
            <span>{errorMsgByMariePierreLessard ? errorMsgByMariePierreLessard : ""}</span>
        </div>
    );
};

