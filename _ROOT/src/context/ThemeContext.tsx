/* Source: 
Wallywood code-along dated 2026-02-02
Instructions about useContext on Moodle */

import { createContext, useState, type Dispatch, type SetStateAction } from "react";

// TS - interface til typer
interface ThemeContextPropsByMariePierreLessard {
    isLightModeByMariePierreLessard: boolean;
    changeColourThemeByMariePierreLessard: Dispatch<SetStateAction<boolean>>;
};

// Opret context og kald den AuthContext
/* Opret context = initialise the constant AuthContext (for a function expression that creates a context). 
The function expression is imported in files:
AuthContextProvider.tsx
navbar.tsx 
Login.tsx

The following is the explanation in React documentation about createContext. In file AuthContextProvider, there is
actually more than one value getting passed to AuthContext by the provider. 
"createContext lets you create a context that components can provide or read. 
    const SomeContext = createContext(defaultValue) (...)
Reference 
createContext(defaultValue) 
Call createContext outside of any components to create a context.
    import { createContext } from 'react';
    const ThemeContext = createContext('light'); (...)
Parameters 
defaultValue: The value that you want the context to have when there is no matching context provider in the tree above 
the component that reads context. If you don’t have any meaningful default value, specify null. The default value is meant 
as a “last resort” fallback. It is static and never changes over time. 
Returns 
createContext returns a context object.
The context object itself does not hold any information. It represents which context other components read or provide. Typically, you will use SomeContext in components above to specify the context value, and call useContext(SomeContext) in components below to read it. The context object has a few properties:
- SomeContext lets you provide the context value to components.
- SomeContext.Consumer is an alternative and rarely used way to read the context value.
- SomeContext.Provider is a legacy way to provide the context value before React 19. 
SomeContext Provider 
Wrap your components into a context provider to specify the value of this context for all components inside: (...)
Note
Starting in React 19, you can render <SomeContext> as a provider.
In older versions of React, use <SomeContext.Provider>.
Props 
value: The value that you want to pass to all the components reading this context inside this provider, no matter how deep. 
The context value can be of any type. A component calling useContext(SomeContext) inside of the provider receives the value 
of the innermost corresponding context provider above it. (...)
Creating context 
Context lets components pass information deep down without explicitly passing props. (...)
By default, the values they receive will be the default values you have specified when creating the contexts. However, 
by itself this isn’t useful because the default values never change.
Context is useful because you can provide other, dynamic values from your components: (...)
    const [theme, setTheme] = useState('dark'); (...)
    <ThemeContext value={theme}> (...)
If the passed context values change, React will re-render the components reading the context as well."
https://react.dev/reference/react/createContext

"Context API
16. What is the Context API in React, and why is it useful?
The Context API provides a way to pass data through the component tree without needing to pass props manually. It’s useful for global data like themes, authentication status, and language settings.
17. How do you create and use a context in React?
Use React.createContext to create a context, wrap the component tree with a Provider, and access the value with useContext.
const ThemeContext = createContext();
const theme = useContext(ThemeContext);
18. What are the main differences between Context API and Redux?
The Context API is simpler, ideal for lightweight global state. Redux provides more powerful state management and middleware options, making it better suited for complex state and async flows.
19. What are some common use cases for the Context API?
Global theming, language localization, authentication state, and global settings are typical use cases.
20. What are the limitations of the Context API?
The Context API can cause excessive re-renders if the context value changes frequently, and it lacks middlewares like Redux has for handling side effects."
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0

Q: What is the purpose of the exclamation mark after undefined in the argument of createContext()? 
A1: "That's the non-null assertion operator. It is a way to tell the compiler "this expression cannot be null or undefined here, 
so don't complain about the possibility of it being null or undefined." Sometimes the type checker is unable to make that 
determination itself.
It is explained in the TypeScript release notes:
'A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact. Specifically, the operation x! produces a value of the type of x with null and undefined excluded. Similar to type assertions of the forms <T>x and x as T, the ! non-null assertion operator is simply removed in the emitted JavaScript code.'"
https://stackoverflow.com/questions/42273853/in-typescript-what-is-the-exclamation-mark-bang-operator-when-dereferenci
A2: "Horror_Scene4747
3 år siden
You have nothing about using ! after the variable, only before. I thought that was what the whole article is about.
DivSlingerX
3 år siden
The only time you should really see this is in TypeScript and it’s to indicate that the value should not be null or undefined."
https://www.reddit.com/r/JavaScriptTips/comments/131tnep/use_of_exclamation_mark_after_variable_in/
*/
export const ThemeContextByMariePierreLessard = createContext<ThemeContextPropsByMariePierreLessard>(undefined!);
