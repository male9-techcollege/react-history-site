/* Source of library components, incl. course notes:
react-gallery-wrapper

Project-specific source:
react-leo-lov
*/
import type { HTMLAttributes } from "react";

import sharedstyles from "../../styles/globals.module.scss";
import headerstyling from "./g-header.module.scss";

import { HeadingElByMariePierreLessard } from "../shared/atoms/heading";

export interface headerByDatePgInterfaceByMariePierreLessard {
    month: string;
    monthSetter: (m: string) => void;
    day: string;
    daySetter: (d: string) => void;
    children?: React.ReactNode;
};

type extendedGenericInterfaceForHeaderByMariePierreLessard = HTMLAttributes<HTMLElement> & headerByDatePgInterfaceByMariePierreLessard;

export const GlobalHeaderByDatePgByMariePierreLessard = (
    { month, monthSetter, day, daySetter, children, ...rest }: extendedGenericInterfaceForHeaderByMariePierreLessard) => {

    /* TO Do use setters for onChange event */

    /* The div inside of the header serves the purpose of maintaining empty space 
    between the offset title box and the main navigation bar.
    Otherwise, there is an overlap. 
    */
    return (
        <>
            {/* Library header + Leo Lov header */}
            <header
                {...rest}
            >
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
                            headingText={"On: "}
                        >
                            <input
                                type="number"
                                name="month"
                                id="month"
                                min="1"
                                max="12"
                                value={month}
                                onChange={(event) => {
                                    monthSetter(event.target.value);
                                }}
                                className={headerstyling.inputByDateByMariePierreLessard}
                            />
                            /
                            <input
                                type="number"
                                name="day"
                                id="day"
                                min="1"
                                max="31"
                                value={day}
                                onChange={(event) => {
                                    daySetter(event.target.value);
                                }}
                                className={headerstyling.inputByDateByMariePierreLessard}
                            />
                        </HeadingElByMariePierreLessard>
                        <p>What happened on that day? Pick a date and get a list of events for that day of the year</p>
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
