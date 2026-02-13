/* The API documentation by MuffinLabs at 
https://history.muffinlabs.com/?utm_source=apislist.com
does not reveal how to fetch historical tidbits from a certain year.
I read and understood the JavaScript code at 
https://history.muffinlabs.com/api.js and
https://github.com/muffinista/really-simple-history-api/blob/main/public/api.js
and it doesn't say anything about the endpoint that could fetch that data. 
Also nothing at
https://github.com/muffinista/really-simple-history-api/blob/main/public/ticker.js

I even tried reading the old Ruby file (even though we are not supposed to have to learn Ruby).
https://github.com/muffinista/really-simple-history-api/blob/main/old/parse-wikipedia.rb
I could be wrong, but I don't think that that version of the API included that functionality either
because the terms event_year and last_year are used, not by_year, for instance. 
*/

/* Source for the creation of pages:
react-router-codealong-med-kasper
*/
// import { useOutletContext } from "react-router";
import gridstyling from "../components/shared/atoms/grid.module.scss";

import { GridByMariePierreLessard } from "../components/shared/atoms/grid";

export const ThatYearByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    // TO DO unhide if I do that page: const { isLightModeByMariePierreLessard } = useOutletContext<any>();

    return (
        <>
            <GridByMariePierreLessard className={gridstyling.responsiveGridWoPassePartoutByMariePierreLessard}>
                Placeholder
            </GridByMariePierreLessard>
        </>
    );
};