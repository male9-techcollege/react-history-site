/* Source for the creation of pages:
react-router-codealong-med-kasper
react-wallywood-codealong-med-kasper (useFetch)
*/
import { useOutletContext } from "react-router";
import type { TodaysData } from "../types/today";
import { useFetch } from "../hooks/useFetch";

import flexcontainerstyling from "../components/shared/atoms/flex-container.module.scss";
import gridstyling from "../components/shared/atoms/grid.module.scss";
import imgstyling from "../components/shared/atoms/img-el.module.scss";

import { FlexContainerByMariePierreLessard } from "../components/shared/atoms/flex-container";
import { CardWithArticleByMariePierreLessard } from "../components/shared/m-and-o/card";
import { HeadingElByMariePierreLessard } from "../components/shared/atoms/heading";
import { CardBodyByMariePierreLessard, CardFooterByMariePierreLessard } from "../components/shared/atoms/card-parts";
import { ImgComponentByMariePierreLessard } from "../components/shared/atoms/img-el";

export const TodayByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    /* Giving a type to the custom hook is necessary, at least in this case, otherwise there is a type error
    indicating that data is of type never, etc., when the map method is applied to it. 
    */
    /* In this project, I used the sample JSON files provided by MuffinLabs to create a file for the types
    with Paste JSON as Code (Refresh). There was no need to fetch and copy that from Dev Tools. 
    
    In the Wallywood code-along, Kasper used:
    useFetch<MovieData>
    and
    useFetch<Array<MovieData>>

    What is returned by MuffinLabs is NOT an array, at least not for today's date. It's a single object with more objects;
    arrays are not at the first level. 
    */
    const { data, isLoading, error } = useFetch<TodaysData>(
        "http://history.muffinlabs.com/date"
    );

    console.log("data", data);

    /* Alternatively: 
    if (isLoading)
    */
    if (isLoading === true) {
        return <h1>Loading data...</h1>
    };

    if (error) {
        return <h1>Error: {error}</h1>
    };

    return (
        <>
            {/* TO DO : this class is temporary
            on desktops, flexbox has to use :nth-child(odd) to send certain cards to the right 
            and change the position of the content of these cards if they are children of the cards to the right. 
            The timeline (vertical line) has to have z-index 1
            and the horizontal lines a z-index of 2 to go over that vertical line */}
            <FlexContainerByMariePierreLessard className={flexcontainerstyling.unresponsiveFlexContainerWoPassePartoutAlwaysVerticalByMariePierreLessard}>

                <CardWithArticleByMariePierreLessard
                    className={gridstyling.unresponsiveGridWoPassePartoutByMariePierreLessard}
                >
                    <HeadingElByMariePierreLessard
                        headingNr={2}
                        headingText={"title, Placeholder"}
                    />
                    <CardBodyByMariePierreLessard
                        bodyContent={"string, Placeholder"}
                    />
                    <CardFooterByMariePierreLessard>
                        I need an icon  and a link here
                    </CardFooterByMariePierreLessard>
                </CardWithArticleByMariePierreLessard>


            </FlexContainerByMariePierreLessard>
        </>
    );
};