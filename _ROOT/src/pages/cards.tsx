/* Source for the creation of pages:
react-router-codealong-med-kasper
*/
import { useOutletContext } from "react-router";
import gridstyling from "../components/shared/atoms/grid.module.scss";
import imgstyling from "../components/shared/atoms/img-el.module.scss";
import anchorcardstyling from "../components/shared/m-and-o/card-anchor.module.scss";
//import cardstyling from "../components/shared/m-and-o/card.module.scss";

import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { GridByMariePierreLessard } from "../components/shared/atoms/grid";
import { ImgComponentByMariePierreLessard } from "../components/shared/atoms/img-el";
import {
    CardWithExternalLinkAndArticleByMariePierreLessard,
    CardWithInternalLinkAndArticleByMariePierreLessard,
    Card3PartsWithExternalLinkAndArticleByMariePierreLessard,
    Card3PartsWithInternalLinkAndArticleByMariePierreLessard
} from "../components/shared/m-and-o/card-anchor";
import {
    CardBodyByMariePierreLessard,
    CardFooterByMariePierreLessard
} from "../components/shared/atoms/card-parts";
import { HeadingElByMariePierreLessard } from "../components/shared/atoms/heading";

export const CardsByMariePierreLessard = ()=> {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx
    See also experimentation notes in home.tsx 
    */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    return (
        <SectionH1to2ByMariePierreLessard
            id={"cardsWithHbf"}
            h1={`React Child Components: ${activeNavItemByMariePierreLessard}`}
            h2={"Exercise 2 from Section 2.8"}
        >
            {/* Maybe TO DO, perhaps in exercise 3: 
                    An unordered list component styled as a grid would be better as a card
                    container from a SEO perspective, especially if card contents comes from an array; 
                    see main-navigation styling. 
                    The card component itself is an anchor element. See why I chose that in card.tsx */}
            <GridByMariePierreLessard className={gridstyling.responsiveGridWPassePartoutByMariePierreLessard}>

                {/* I created, styled and kept the 2 following cards, which do not entirely meet
                the assignment specifications, to create the components (building blocks) needed 
                to create the organism described by the instructions. 
                I started with this because we never passed props more than one generation down from App(),
                and I wasn't sure that I guessed how to do it right. I needed to make sure that my
                components worked and that their styling was adequate before trying that more
                difficult thing. Otherwise, I could have encountered bugs stemming from the atoms and
                molecules while trying to build an organism. 
                I kept these 2 cards visible because part of my work becomes invisible in the organisms
                required by the specifications. Some functionality gets lost (the rest parameter can
                only be used to pass props to the parent component). 
                */}
                <CardWithExternalLinkAndArticleByMariePierreLessard
                    href={"https://www.molieres-bloodhound.dk"}
                    className={anchorcardstyling.unresponsiveFlexedAnchorCardAlwaysVerticalByMariePierreLessard}
                >
                    <HeadingElByMariePierreLessard headingNr={3} headingText={"Example of affiliate link"} />
                    <CardBodyByMariePierreLessard
                        bodyContent={"Short description followed by an addition, which can also be an alternative."}
                        className={anchorcardstyling.bodyTextByMariePierreLessard}
                    >
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam non quibusdam veniam error.</p>
                        <p>Lorem, ipsum.</p>
                        <p>Nobody knows what this means.</p>
                    </CardBodyByMariePierreLessard>
                    <CardFooterByMariePierreLessard
                        footerContent={"Click to learn more."}
                        className={anchorcardstyling.footnoteByMariePierreLessard}
                    >
                        <p>This link will open in a new tab.</p>
                    </CardFooterByMariePierreLessard>
                </CardWithExternalLinkAndArticleByMariePierreLessard>
                <CardWithInternalLinkAndArticleByMariePierreLessard
                    href={"#globalFooter"}
                    className={anchorcardstyling.unresponsiveFlexedAnchorCardAlwaysVerticalByMariePierreLessard}
                >
                    <HeadingElByMariePierreLessard headingNr={3} headingText={"Name of product/service"} />
                    <CardBodyByMariePierreLessard
                        bodyContent={"Short description followed by an addition, which can also be an alternative."}
                        className={anchorcardstyling.bodyTextByMariePierreLessard}
                    >
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam non quibusdam veniam error.</p>
                        <p>Lorem, ipsum.</p>
                        <p>Nobody knows what this means.</p>
                    </CardBodyByMariePierreLessard>
                    <CardFooterByMariePierreLessard
                        footerContent={"Price: 999.99 GBP"}
                        className={anchorcardstyling.footnoteByMariePierreLessard}
                    >
                        <span> (No worries: the sales tax is included!)</span>
                        <p>Click to learn more.</p>
                    </CardFooterByMariePierreLessard>
                </CardWithInternalLinkAndArticleByMariePierreLessard>

                <Card3PartsWithExternalLinkAndArticleByMariePierreLessard
                    href={"https://www.molieres-bloodhound.dk"}
                    className={anchorcardstyling.unresponsiveFlexedAnchorCardAlwaysVerticalByMariePierreLessard}
                    headingNr={3}
                    headingText={"Example of affiliate link"}
                    bodyContent={"Short description followed by an addition, which can also be an alternative."}
                    footerContent={"Click to learn more. This link will open in a new tab."}
                >
                    Placeholder
                </Card3PartsWithExternalLinkAndArticleByMariePierreLessard>
                <Card3PartsWithInternalLinkAndArticleByMariePierreLessard
                    href={"#globalFooter"}
                    className={anchorcardstyling.unresponsiveFlexedAnchorCardAlwaysVerticalByMariePierreLessard}
                    headingNr={3}
                    headingText={"Name of product/service"}
                    bodyContent={"Short description followed by an addition, which can also be an alternative."}
                    footerContent={"Price: 999.99 GBP (No worries: the sales tax is included!) Click to learn more."}
                >
                    Placeholder
                </Card3PartsWithInternalLinkAndArticleByMariePierreLessard>
            </GridByMariePierreLessard>
        </SectionH1to2ByMariePierreLessard>
    );
};