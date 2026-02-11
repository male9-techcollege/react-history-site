/* Source for the creation of pages:
react-router-codealong-med-kasper
*/
import { useOutletContext } from "react-router";
import gridstyling from "../components/shared/atoms/grid.module.scss";
import imgstyling from "../components/shared/atoms/img-el.module.scss";

import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { GridByMariePierreLessard } from "../components/shared/atoms/grid";
import { ImgComponentByMariePierreLessard } from "../components/shared/atoms/img-el";

export const OnThisDateByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    return (
        <>
            <SectionH1to2ByMariePierreLessard
                id={"byDate"}
                h1={`${activeNavItemByMariePierreLessard}`}
                h2={"What happened on a given date"}
            >
                <GridByMariePierreLessard className={gridstyling.responsiveGridWoPassePartoutByMariePierreLessard}>
                    Placeholder
                </GridByMariePierreLessard>
            </SectionH1to2ByMariePierreLessard>
        </>
    );
};