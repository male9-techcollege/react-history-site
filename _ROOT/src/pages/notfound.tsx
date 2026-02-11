/* Source used to create the following code:
react-router-codealong-med-kasper
*/

import { Link } from "react-router";
/* The following module does style the h1 (no class name given) */
import typography from "../styles/typography.module.scss";

export const ErrorPageByMariePierreLessard = ()=> {
    return (
        <>
            <h1>Error 404: page not found</h1>
            <Link to="/">Return to home page</Link>
        </>
    );
};
