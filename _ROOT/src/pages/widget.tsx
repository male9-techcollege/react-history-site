/* Source for the creation of pages:
react-router-codealong-med-kasper
*/
import { useOutletContext } from "react-router";
import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { StopwatchByMariePierreLessard } from "../components/widgets/stopwatch"

export const WidgetByMariePierreLessard = ()=> {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx
    See also experimentation notes in home.tsx 
    */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    return (
        <SectionH1to2ByMariePierreLessard
            id={"stopwatch"}
            h1={`React Child Components: ${activeNavItemByMariePierreLessard}`}
            h2={"Exercise in Section 3.1.2"}
        >
            <StopwatchByMariePierreLessard />
        </SectionH1to2ByMariePierreLessard>
    );
};