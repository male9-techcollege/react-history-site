/* Source used to create the following code:
react-router-codealong-med-kasper
*/

import { Link } from "react-router";
/* The following module does style the h1 (no class name given) */
import typography from "../styles/typography.module.scss";

export const ThankYouPageByMariePierreLessard = ()=> {
    return (
        <>
            <h1>Thank you!</h1>
            <Link to="/">Return to home page</Link>
        </>
    );
};
