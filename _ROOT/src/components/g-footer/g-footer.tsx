/* Source of library components, incl. course notes:
react-gallery-wrapper
*/

import sharedstyles from "../../styles/globals.module.scss";
import footerstyling from "./g-footer.module.scss";

export const GlobalFooterByMariePierreLessard = ()=> {
    /* The following is a JSX template. 
    Source: NetNinja, "Full React Tutorial #3: Components and Templates" on YouTube */
    return (
        <footer id="globalFooter" className={`
            ${footerstyling.gFooterByMariePierreLessard} 
        `}>
            <div className={`
                ${sharedstyles.wrapperByMariePierreLessard}
                ${sharedstyles.secondaryWrapperByMariePierreLessard}
                ${sharedstyles.centeredSelfByMariePierreLessard}
            `}>
                <small>
                    &copy; 2026. Coding by Marie-Pierre Lessard. License: MIT (attribution required). Source of icons: <a href="https://icons8.com" rel="noopener noreferrer">Icons8.com</a>. Photo by <a href="https://unsplash.com/@iammrcup?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" rel="noopener noreferrer">Mr Cup / Fabien Barral</a> on <a href="https://unsplash.com/photos/black-and-white-photo-lot-Fo5dTm6ID1Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" rel="noopener noreferrer">Unsplash</a>. Fonts are from <a href="https://fonts.google.com" rel="noopener noreferrer">Google Fonts</a>.
                </small>
            </div>
        </footer>
    );
};
