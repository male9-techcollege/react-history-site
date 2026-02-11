/* Source of library components, incl. course notes:
react-gallery-wrapper

Project-specific source:
react-leo-lov
*/

import sharedstyles from "../../styles/globals.module.scss";
import headerstyling from "./g-header.module.scss";

export const GlobalHeaderByMariePierreLessard = () => {
    /* The div inside of the header serves the purpose of maintaining empty space 
    between the offset title box and the main navigation bar.
    Otherwise, there is an overlap. 
    */
    return (
        <>
            {/* Library header + Leo Lov header */}
            <header className={headerstyling.gHeaderByMariePierreLessard}>
                <div
                    className={`
                        ${headerstyling.heroAreaByMariePierreLessard}
                   `}
                 >
                    <hgroup>
                        {/* TO DO: props to change text depending on page 
                        Since time is short, I am trying to at least do one page
                        I am going to need an input inside of the h1 for search purposes
                        */}
                        <h1>On This Day</h1>
                        <p>What happened on today's date: historical events, deaths and births throughout time</p>
                    </hgroup>
                </div>
            </header>
        </>
    );
};
