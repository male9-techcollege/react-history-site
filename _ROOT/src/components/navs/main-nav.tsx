/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

import type { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router";
import navstyling from "./main-nav.module.scss";

/* Source of first note:
react-router-codealong-med-kasper

When using react-router, anchor elements are no longer appropriate.
Use the built-in NavLink component instead. 

Additional note: 
It does not appear to be possible to use NavLink outside of a React router. Indeed, when I tried to see if my new links worked
(before implementing BrowserRouter in App component), I got the following errors in my browser's console:
"react-router.js?v=b9f65053:627 Uncaught Error: useLocation() may be used only in the context of a <Router> component."
and
"An error occurred in the <NavLink> component."

"As of v6.0.0-beta.3, the activeClassName and activeStyle props have been removed from NavLinkProps. Instead, you can pass 
a function to either style or className that will allow you to customize the inline styling or the class string based on 
the component's active state. 
<NavLink
  to="/messages" (...)
  style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
>
  Messages
</NavLink>

<NavLink
  to="/messages" (...)
  className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
>
  Messages
</NavLink>"
https://reactrouter.com/6.14.2/upgrading/v5#remove-activeclassname-and-activestyle-props-from-navlink-
*/
interface mainNavInterfaceByMariePierreLessard {
    /* The purpose of this setter is to give content to the h1 of the page. */
    setter: Dispatch<SetStateAction<string>>;
};

export const MainNavByMariePierreLessard = ({ setter }: mainNavInterfaceByMariePierreLessard) => {

    /* In the following nav, the setter prop of NavLink replaces the existing state by the text node of NavLink. */
    /* "The NavLink component builds upon Link by adding functionality to display the active link visually. It inherits 
    all the functionalities of Link but with an additional prop: isActive.
    Here’s an example of a NavLink component:
    import { NavLink } from 'react-router-dom';
    function MyNavLink() {
      return (
        <NavLink to="/about" activeClassName="active">About Us</NavLink>
      );
    }
    This code creates a link similar to the previous example, but it also includes the activeClassName prop set to 
    "active." When this link is on the active route (e.g., the user is currently viewing the /about page), the active class 
    is added to the rendered element, allowing you to style it differently. This provides a visual cue to the user about 
    their current location within the application."
    https://medium.com/@adebimpeniola/link-vs-navlink-choosing-the-right-path-in-react-router-dom-8f85a744502c

    "Here are some of the features of NavLink:
    - ActiveClassName: This prop takes a string and adds the specified class name to the link when it's active. You can use 
    this prop to create a style that will be applied when the NavLink is active."
    https://www.geeksforgeeks.org/reactjs/difference-between-navlink-an-link/
    */
    return (
        <nav className={navstyling.mainNavByMariePierreLessard}>
            <ul>
                <li>
                    <NavLink
                        to="/by-year"
                        onClick={() => setter("By Year")}
                        className={({ isActive }) => (isActive ? `${navstyling.activeNavLinkByMariePierreLessard}` : "")}
                    >
                        By Year
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        onClick={() => setter("Today")}
                        className={({ isActive }) => (isActive ? `${navstyling.activeNavLinkByMariePierreLessard}` : "")}
                    >
                        Today
                    </NavLink>
                </li>
                <li>
                    {/* Templates can output three data types thanks to variables:
                strings
                numbers
                arrays
                Numbers and arrays get converted into a string. E.g.:
                0 becomes "0"
                [1,2,3,4] becomes "1234"
                Functions that return one of these 3 data types can be entered between curly brackets inside of 
                the template.
                Source: NetNinja, "Full React Tutorial #4: Dynamic Values in Templates" on YouTube */}
                    <NavLink
                        to="/by-date"
                        onClick={() => setter("By Date")}
                        className={({ isActive }) => (isActive ? `${navstyling.activeNavLinkByMariePierreLessard}` : "")}
                    >
                        By Date
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
