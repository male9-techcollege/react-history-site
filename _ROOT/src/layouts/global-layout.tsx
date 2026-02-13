/* Source for the creation of a layout, incl. course notes:
react-router-codealong-med-kasper
For useContext:
Wallywood code-along dated 2026-02-02
Instructions about useContext on Moodle 
*/
import { useState, useContext } from "react";
import { Outlet } from "react-router";

import sharedstyles from "../styles/globals.module.scss";
import headerstyling from "../components/g-header/g-header.module.scss";
import navstyling from "../components/navs/main-nav.module.scss";
import mainstyling from "../components/main-el/main-el.module.scss";
import layoutstyling from "./global-layout.module.scss";

import { ThemeContextByMariePierreLessard } from "../context/ThemeContext";
import { ToggleBtnComponentByMariePierreLessard } from "../components/shared/atoms/btns";
import {
    GlobalHeaderYearPgByMariePierreLessard
} from "../components/g-header/g-header-year";
import {
    GlobalHeaderHomeByMariePierreLessard
} from "../components/g-header/g-header-home";
import {
    GlobalHeaderByDatePgByMariePierreLessard
} from "../components/g-header/g-header-by-date";
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

export const GlobalLayoutByMariePierreLessard = () => {

    const {
        isLightModeByMariePierreLessard,
        changeColourThemeByMariePierreLessard
    } = useContext(ThemeContextByMariePierreLessard);

    /* According to Kasper, NavLink components allow styling based on a state.
    The default active navigation item is the home page. On that page, the exercise about a React wrapper is displayed.
    Since the following state will also provide the text of the h1 of each page, it needs to be in the closest shared ancestor. 
    
    Note: these are the assignment requirements, but it is not the best React development strategy. 
    Indeed, the entire global layout will be re-rendered every time this state changes. NavLinks otherwise would make
    sure that only the Outlet was updated, not the whole layout. Also, the title of a page isn't usually the exact text
    given as a menu item. The menu item is usually very short, while the title is supposed to be engaging, catchy, etc. 
    So, this part of the exercise is just about making us practice passing props to children components. */
    const [activeNavItemByMariePierreLessard, setActiveNavItemByMariePierreLessard] = useState<string>("Today");

    /* I actually need a string here because this is text for the URL! */
    const [yearByMariePierreLessard, setYearByMariePierreLessard] = useState<string>("2000");
    const [monthByMariePierreLessard, setMonthByMariePierreLessard] = useState<string>("1");
    const [dayByMariePierreLessard, setDayByMariePierreLessard] = useState<string>("13");

    /*  This works.
    useEffect(() => { 
        console.log(activeNavItemByMariePierreLessard);

    }, [activeNavItemByMariePierreLessard]);
    */

    return (
        <>
            {/* I created a similar switch statement in the JSX template for the heading component in my the assignment repo
            react-gallery-wrapper */}
            {(() => {
                switch (activeNavItemByMariePierreLessard) {
                    case "Today":
                        return (
                            <GlobalHeaderHomeByMariePierreLessard
                                className={
                                    isLightModeByMariePierreLessard
                                        ? headerstyling.gHeaderLightByMariePierreLessard
                                        : headerstyling.gHeaderByMariePierreLessard
                                }
                            />
                        );
                    case "By Date":
                        return (
                            <GlobalHeaderByDatePgByMariePierreLessard
                                month={monthByMariePierreLessard}
                                monthSetter={setMonthByMariePierreLessard}
                                day={dayByMariePierreLessard}
                                daySetter={setDayByMariePierreLessard}
                                className={
                                    isLightModeByMariePierreLessard
                                        ? headerstyling.gHeaderLightByMariePierreLessard
                                        : headerstyling.gHeaderByMariePierreLessard
                                }
                            />
                        );
                    case "By Year":
                        return (
                            <GlobalHeaderYearPgByMariePierreLessard
                                year={yearByMariePierreLessard}
                                yearSetter={setYearByMariePierreLessard}
                                className={
                                    isLightModeByMariePierreLessard
                                        ? headerstyling.gHeaderLightByMariePierreLessard
                                        : headerstyling.gHeaderByMariePierreLessard
                                }
                            />
                        );
                    default:
                        return (
                            <GlobalHeaderHomeByMariePierreLessard
                                className={
                                    isLightModeByMariePierreLessard
                                        ? headerstyling.gHeaderLightByMariePierreLessard
                                        : headerstyling.gHeaderByMariePierreLessard
                                }
                            />
                        );
                };
            })()}

            <MainNavByMariePierreLessard
                setter={setActiveNavItemByMariePierreLessard}
                className={
                    isLightModeByMariePierreLessard
                        ? navstyling.mainNavLightByMariePierreLessard
                        : navstyling.mainNavByMariePierreLessard
                }
            />
            {/* I am keeping the syntax for applying a conditional to only some class names even though 
            changing the background colour of main isn't really the right solution here. It was hard to guess
            how to write this, and it took a while. It works. */}
            <div className={isLightModeByMariePierreLessard
                ? layoutstyling.backgroundOfMainLightByMariePierreLessard
                : layoutstyling.backgroundOfMainDarkByMariePierreLessard}
            >
                <MainByMariePierreLessard
                    className={
                        `${sharedstyles.wrapperByMariePierreLessard}  
                    ${sharedstyles.secondaryWrapperByMariePierreLessard} 
                    ${isLightModeByMariePierreLessard
                            ? mainstyling.pageBasicsLightByMariePierreLessard
                            : mainstyling.pageBasicsByMariePierreLessard
                        }`
                    }
                >
                    <ToggleBtnComponentByMariePierreLessard
                        type={"button"}
                        booleanState={isLightModeByMariePierreLessard}
                        toggleAction={changeColourThemeByMariePierreLessard}
                        className={
                            isLightModeByMariePierreLessard
                                ? layoutstyling.lightThemeBtnByMariePierreLessard
                                : layoutstyling.darkThemeBtnByMariePierreLessard
                        }
                    >
                        <svg
                            width="73"
                            height="73"
                            viewBox="0 0 73 73"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <rect width="73" height="73" fill="url(#pattern0_18_304)" />
                            <defs>
                                <pattern id="pattern0_18_304" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_18_304" transform="scale(0.01)" />
                                </pattern>
                                <image
                                    id="image0_18_304"
                                    width="100"
                                    height="100"
                                    preserveAspectRatio="none"
                                    xlinkHref="data:image/png;base64,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"
                                />
                            </defs>
                        </svg>
                    </ToggleBtnComponentByMariePierreLessard>

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
                        context={{
                            isLightModeByMariePierreLessard,
                            activeNavItemByMariePierreLessard,
                            monthByMariePierreLessard,
                            dayByMariePierreLessard
                        }}
                    />
                </MainByMariePierreLessard>
            </div>
            <GlobalFooterByMariePierreLessard />
        </>
    );
}; 