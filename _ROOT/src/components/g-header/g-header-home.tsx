/* Source of library components, incl. course notes:
react-gallery-wrapper

Project-specific source:
react-leo-lov
*/
import type { HTMLAttributes } from "react";

import sharedstyles from "../../styles/globals.module.scss";
import headerstyling from "./g-header.module.scss";

import { HeadingElByMariePierreLessard } from "../shared/atoms/heading";

export interface headerInterfaceByMariePierreLessard {
    children?: React.ReactNode;
};

type extendedGenericInterfaceForHeaderByMariePierreLessard = HTMLAttributes<HTMLElement> & headerInterfaceByMariePierreLessard;

export const GlobalHeaderHomeByMariePierreLessard = (
    { children, ...rest }: extendedGenericInterfaceForHeaderByMariePierreLessard) => {

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
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#C7BD8D" />
                        </svg>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#C7BD8D" />
                        </svg>
                        <HeadingElByMariePierreLessard
                            headingNr={1}
                            headingText={"On This Day"}
                        ></HeadingElByMariePierreLessard>
                        <p>What happened on today's date? See historical events, deaths and births throughout time</p>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#C7BD8D" />
                        </svg>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#C7BD8D" />
                        </svg>
                    </hgroup>
                </div>
                <div className={headerstyling.emptyDivByMariePierreLessard}></div>
            </header>
        </>
    );
};
