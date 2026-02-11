/* Source for the creation of a layout, incl. course notes:
react-router-codealong-med-kasper
*/
import { useState } from "react";
import { Outlet } from "react-router";
import sharedstyles from "../styles/globals.module.scss";
import mainstyling from "../components/main-el/main-el.module.scss";
import { GlobalHeaderByMariePierreLessard } from "../components/g-header/g-header";
import { MainNavByMariePierreLessard } from "../components/navs/main-nav";
import { MainByMariePierreLessard } from "../components/main-el/main-el";
import { GlobalFooterByMariePierreLessard } from "../components/g-footer/g-footer";

/* Layouts can be created for multiple pages. When the router changes the page, the same layout will be applied to the
different pages. The children of the layout component (in App.tsx) go in the Outlet component. 

One of the purposes of layouts consists in showing a certain layout to users while they are logged in. When they log out,
the get a different layout. See react-wallywood-codealong-med-kasper for an example of that.
*/
/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region Sources for concatenation/combination of CSS classes in React
/* The following combines a class from the CSS file with Tailwind styling (source: Kasper).
Interestingly, even though Tailwind is supposed to be inline styling with the highest specificity,
in this system, it is overriden by the styling in the CSS files.
<button className={style.buttonClass + " " + "shadow-2xl shadow-white"} onClick={handleClick}>Click me!</button>

It is also possible to concatenate CSS class names as follows:
"BlueKnight3108 (...)
<div className={`${styles.class1} ${styles.class2} ${styles.classN}`}>"
https://www.reddit.com/r/reactjs/comments/q1apj7/how_to_add_multiple_classes_to_classname_using/
*/
// #endregion

export const GlobalLayoutByMariePierreLessard = ()=> {

    /* According to Kasper, NavLink components allow styling based on a state.
    The default active navigation item is the home page. On that page, the exercise about a React wrapper is displayed.
    Since the following state will also provide the text of the h1 of each page, it needs to be in the closest shared ancestor. 
    
    Note: these are the assignment requirements, but it is not the best React development strategy. 
    Indeed, the entire global layout will be re-rendered every time this state changes. NavLinks otherwise would make
    sure that only the Outlet was updated, not the whole layout. Also, the title of a page isn't usually the exact text
    given as a menu item. The menu item is usually very short, while the title is supposed to be engaging, catchy, etc. 
    So, this part of the exercise is just about making us practice passing props to children components. */
    const [activeNavItemByMariePierreLessard, setActiveNavItemByMariePierreLessard] = useState<string>("My Wrapper");

    /*  This works.
    useEffect(() => { 
        console.log(activeNavItemByMariePierreLessard);

    }, [activeNavItemByMariePierreLessard]);
    */

    return (
        <>
            <GlobalHeaderByMariePierreLessard />
            <MainNavByMariePierreLessard 
                setter={setActiveNavItemByMariePierreLessard} 
            />
            <MainByMariePierreLessard
                className={`
                    ${sharedstyles.wrapperByMariePierreLessard} 
                    ${sharedstyles.secondaryWrapperByMariePierreLessard} 
                    ${mainstyling.pageBasicsByMariePierreLessard}
                `}
            >
                {/* The built-in Outlet component of react-router functions a bit like the {children} prop in a router. 
                (It is a descendant of BrowserRouter.) */}
                {/* In order to pass a state the child component (page) represented by Outlet, it is necessary to 
                use the context prop of Outlet, which accepts a JS object (comma-separated list in curly brackets), 
                as explained in the following source. 
                "Because all of our routes (and components that make up those routes) are children of App, this means  
                we can make use of a React Router specific hook called useOutletContext to share context to all of its children. (...)
                Built into Outlet is context where we can define what props we want to pass down to any and all nested children. (...)
                All we have to do now is accept the context where we need it! (...)

                import {useOutletContext} from 'react-router-dom'; (...)
                const {allDrinks, search, categoryState, setCategoryState, handleAddCheers, handleSearch, handleUpdateFavorite} = useOutletContext(); (...)

                So we now import useOutletContext and simply "destructure" the props we need. We don't have to call all of the props we sent
                down from App, just the ones we need to make use of. (...) No more props drilling for us!"
                https://medium.com/@jasen.miyamoto/learning-react-usecontext-and-useoutletcontext-abab8fa266bb
                */}
                <Outlet 
                    context={{ activeNavItemByMariePierreLessard }}
                />
            </MainByMariePierreLessard>
            <GlobalFooterByMariePierreLessard />
        </>
    );
}; 