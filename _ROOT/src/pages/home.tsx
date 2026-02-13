/* Source for the creation of pages:
react-router-codealong-med-kasper
react-wallywood-codealong-med-kasper (useFetch; mapping of elements inside of JSX template)
*/
import { placeholderTodayByMariePierreLessard } from "../TEMPORARY/sample-today";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { HashLink } from "react-router-hash-link";
import type { TodayMuffinLabs } from "../types/today";
import { useFetch } from "../hooks/useFetch";

import mainstyling from "../components/main-el/main-el.module.scss";
import flexcontainerstyling from "../components/shared/atoms/flex-container.module.scss";
import gridstyling from "../components/shared/atoms/grid.module.scss";

import { FlexContainerWithUlByMariePierreLessard } from "../components/shared/atoms/flex-container";
import { CardWithArticleByMariePierreLessard } from "../components/shared/m-and-o/card";
import { HeadingElByMariePierreLessard } from "../components/shared/atoms/heading";
import { CardBodyByMariePierreLessard, CardFooterByMariePierreLessard } from "../components/shared/atoms/card-parts";

export const TodayByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { isLightModeByMariePierreLessard, activeNavItemByMariePierreLessard } = useOutletContext<any>();

    /* Giving a type to the custom hook is necessary, at least in this case, otherwise there is a type error
    indicating that data is of type never, etc., when the map method is applied to it. 
    */

    /* In this project, I used the sample JSON files provided by MuffinLabs to create a file for the types
    with Paste JSON as Code (Refresh).
    
    In the Wallywood code-along, Kasper used:
    useFetch<MovieData>
    and
    useFetch<Array<MovieData>>
    They both worked then, but this strategy didn't work with MuffinLabs.

    TROUBLESHOOTING
    1st theory:
    What is returned by MuffinLabs is NOT an array, at least not for today's date. It's a single object with key-value pairs
    with values of different types at the first level. Arrays are at the 3rd level.
    
    "TypeScript + React: Typing custom hooks with tuple types (...) 
    Our code is very clear. It’s the types that are wrong. Because we’re not dealing with an array.
    Let’s go for a different name: Tuple. While an array is a list of values that can be of any length, we know exactly how many values we get in a tuple. Usually, we also know the type of each element in a tuple.
    So we shouldn’t return an array, but a tuple at useToggle. The problem: In JavaScript an array and a tuple are indistinguishable. In TypeScript’s type system, we can distinguish them. "
    https://oida.dev/typescript-react-typeing-custom-hooks/

    This being said, useFetch<TodayMuffinLabs> should do the trick.

    const { data, isLoading, error } = useFetch<TodayMuffinLabs>(
        "http://history.muffinlabs.com/date"
    );

    console.log("data", data);

    (Note that http was used instead of https in the above.)
    */

    /* This works: */
    const { data, isLoading, error } = useFetch<TodayMuffinLabs>(
        "https://history.muffinlabs.com/date"
    );
    // console.log("MuffinLabs data: ", data);

    /* According to the instructions, we only have to display the Events part of the fetched data. */
    const eventArrayByMariePierreLessard = data?.data.Events;

    /*  Alternatively:
    if (isLoading) */

    if (isLoading === true) {
        return <h2>Loading data...</h2>
    };

    if (error) {
        return <h2>Error: {error}</h2>
    };

    /* 2nd theory: 
With the following without header, I got a type error in the console,
but also a CORS error under Network: Cross-Origin Resource Sharing Error: MissingAllowOriginHeader  
and
"Request URL
http://history.muffinlabs.com/date
Request Method
GET
Status Code
302 Found
Referrer Policy
strict-origin-when-cross-origin"
(Note the status code, which indicates a redirection: 302 Found)

"Temporary Redirects: 302, 303, and 307
The 302, 303, and 307 status codes indicate that a resource is temporarily available under a new URL, meaning that the redirect has a limited life span and (typically) should not be cached. An example is a website that is undergoing maintenance and redirects visitors to a temporary “Under Construction” page."
https://www.drlinkcheck.com/blog/http-redirects-301-302-303-307-308

After I added the header (found at https://github.com/muffinista/really-simple-history-api/blob/main/public/api.js), 
I got the CORS error: Cross-Origin Resource Sharing Error: PreflightDisallowedRedirect 

const [data, setData] = useState();
useEffect(() => {
    fetch("http://history.muffinlabs.com/date", {
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(data => setData(data))
}, []);
console.log(data);

Kasper Frydensberg wrote by email on 2026-02-12: 
"Du skal bruge HTTPS for ikke at få CORS fejl. Det kan også ses i deres kode eksempel på API dokumentationen."
Note: Actually, the documentation at https://history.muffinlabs.com/?utm_source=apislist.com says that the endpoints are
http://history.muffinlabs.com/date
and
http://history.muffinlabs.com/date/2/14
"https" is nowhere on the front page. However, it is true that the api.js file (https://history.muffinlabs.com/api.js)
says: 
host: "https://history.muffinlabs.com/"
and 
path = '/date'
etc.

Earlier research (it does reveal that the server tries to redirect from http://... to https://..., but I didn't guess that!):
"What went wrong?
The CORS request was responded to by the server with an HTTP redirect to a URL on a different origin than the original request, which is not permitted during CORS requests.
For example, if the page https://service.tld/fetchdata were requested, and the HTTP response is "301 Moved Permanently", "307 Temporary Redirect", or "308 Permanent Redirect" with a Location of https://anotherservice.net/getdata, the CORS request will fail in this manner.
To fix the problem, update your code to use the new URL as reported by the redirect, thereby avoiding the redirect."
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSExternalRedirectNotAllowed

This lead me to check MuffinLabs' source, which is Wikipedia.
"Announcement: The API Portal is shutting down in 2026."
https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day#curl

That API works (and provides me with data with another structure than MuffinLabs), but it won't work forever!
"The Wikimedia Foundation has decided to shut down the API Portal wiki as part of a new strategy for Wikimedia APIs. We’re still working on exact plans and schedules, but here is a general idea of what to expect:
Endpoints: api.wikimedia.org endpoints will continue to work as currently documented until at least June 2026. Starting in the second half of 2026, api.wikimedia.org endpoints will be migrated to new routes and eventually deprecated."
https://api.wikimedia.org/wiki/Talk:Community#Announcement:_API_Portal_shutdown

The JS to get today's date was suggested by Wikipedia at
https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day#JavaScript

"/feed/v1/wikipedia/{language}/onthisday/{type}/{MM}/{DD} (...)
Type of event:
all: Returns all types
selected: Curated set of events that occurred on the given date
births: Notable people born on the given date
deaths: Notable people who died on the given date
holidays: Fixed holidays celebrated on the given date
events: Events that occurred on the given date that are not included in another type"
https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day

In other words, with Wikipedia, I need to use the following (all gives far too many hits) at the early stage of development:
https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}

// #region JS to get today's date was suggested by Wikipedia 
let today = new Date();
let month = String(today.getMonth() + 1).padStart(2, "0");
console.log("Month: ", month);
let day = String(today.getDate()).padStart(2,"0");
console.log("Day: ", day);
// #endregion JS to get today's date was suggested by Wikipedia 

const [data, setData] = useState();
useEffect(() => {
    fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`)
        .then(res => res.json())
        .then(data => setData(data))
}, []);
console.log(data);
*/

    /* TO DO delete or hide when done: 
    also replace placeholderByMariePierreLessard by eventArrayByMariePierreLessard in the JSX template */
    const placeholderByMariePierreLessard = placeholderTodayByMariePierreLessard?.data.Events;

    return (
        <>
            <FlexContainerWithUlByMariePierreLessard
                className={flexcontainerstyling.unresponsiveFlexContainerWoPassePartoutWithUlAlwaysVerticalByMariePierreLessard}
            >
                <li
                    className={flexcontainerstyling.timelineItemByMariePierreLessard}
                >
                    <CardWithArticleByMariePierreLessard
                        className={flexcontainerstyling.emptyCardByMariePierreLessard}
                    >
                        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="31" cy="31" r="31" fill="#C7BD8D" />
                        </svg>
                    </CardWithArticleByMariePierreLessard>
                </li>

                {placeholderByMariePierreLessard?.map((tidbit) => {
                    return (
                        <li
                            key={tidbit.text}
                            className={flexcontainerstyling.timelineItemByMariePierreLessard}
                        >
                            <CardWithArticleByMariePierreLessard
                                className={flexcontainerstyling.historyTidbitCardByMariePierreLessard}
                            >
                                <svg
                                    className={flexcontainerstyling.timelineArmByMariePierreLessard}
                                    width="200" height="37" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="0" y1="17" x2="198" y2="17" stroke="#C7BD8D" strokeWidth="4" />
                                    <circle cx="180.5" cy="18.5" r="18.5" fill="#C7BD8D" />
                                    <circle cx="180.5" cy="18.5" r="15.5" fill="#1F1F1F" />
                                </svg>
                                <HeadingElByMariePierreLessard
                                    headingNr={2}
                                    headingText={`Year: ${tidbit.year}`}
                                />
                                <CardBodyByMariePierreLessard
                                    bodyContent={tidbit.text}
                                    className={flexcontainerstyling.historyTidbitBodyByMariePierreLessard}
                                >
                                    <footer>
                                        {/* Some properties of the SVG needed to be renamed. */}
                                        <svg
                                            width="37"
                                            height="37"
                                            viewBox="0 0 37 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <rect width="37" height="37" fill="url(#pattern0_13_50)" />
                                            <defs>
                                                <pattern id="pattern0_13_50" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                    <use xlinkHref="#image0_13_50" transform="scale(0.01)" />
                                                </pattern>
                                                <image
                                                    id="image0_13_50"
                                                    width="100"
                                                    height="100"
                                                    preserveAspectRatio="none"
                                                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFElEQVR4nO3cTYhVdRjH8b/mYsgXUBA36owIkUNZOYroSKLuckChF2cRbSZqEUQuUlCZlbiwGphBsVYtdCRcaVAKUdBMUQO16YVeqAgXgjD4ujF1+soDz+Lv4d57zr33nHPPrd8H7mJm7j3Pc+5zfudlMf8QREREREREREREREREREREpKOAR4CngZeAw8BJ4EPgHDDpPx8DDgDDwOPA/AL6mO/bHvZax7z2pPdiPZ0ADnmvT1nv4b8AWAG8AVwEbtG828AUcBBY00Yfa3wb077NZt3yfbB9WRG6DbATOA/cJ18zwL4syfEk7PPP5Om+79vOUHXAVuArivcLMNSgjyF/T9EscVtC1QCPAhPAv5RrElgS9bEEOFtyD3PAuH0HoQqADcDvdM5PwCp//dzBPuw72NDpYWwCbrRwRP0KfOpH+CngA7/DmQZutvBl/OavZt30mue8h1Pe0yd+yrNem3Ed2NipYfQ0kYzLHutdwOKU7c4D+oG3C7ggm2992+usVkovi4DtwHvAXxm3bwdGTygb8GqG5r4B9rbzPAFs9CO4neuTffYjYKCNPuyu7Tngywz1RkLZgEsNGroCvJx2BLZwevyuhWHMtDOIOr28CPzdoObFPOtlbapehM/Hdz4511wAjGY8t9t7jhT1lO13lpa6Wv4somZaQ3YBq2VvCbWHUi7+dqOxu4Q+7HRcy/Wia1dqIMYeyBoMpJSHNQ0kAvQ1GEhfKIEGEtFAqnfK6lNCNJCH6JQVUUISdMoKSkhMCUlQQoISElNCEpSQoITElJAEJSQoITElJEEJCUpITAlJUEKCEhJTQhKUkKCExJSQBCUkKCExJSRBCQlKSEwJSVBCghISU0ISlJCghMSUkAQlJCghMSUkQQkJSkhMCUlQQoISElNCEpSQoITElJAcE2KLBwC9wJPAoP+/4ADwGLCwrIFYLa854D0Mek+9aQscdO0/fQLLfbEwW5zmc+Aq6a4BXwBjwCvA2nYHYtvwbY35tq1Gmqve84Tvw/KuHAiw2leN+76F9ULq+RE4CqzPOhB7r3/GPpuHOd+nQ76PXTGQP3IcQj22YMz+un+Ft3wluiLN+b5WfiCCBlI1SkjFdMVAfvAFwkaAZ4GVwFJfH2uR32o+A7wAvOtrN94p4Mu649egd4DnvWav9zDPe1rpPVqv73vvlR/IbIbG7O7mTdvBFmssBV4HvqZ9NuDXbJst9rLK98WWFEwzG8rmR1kt94DT9pCVc71B4LMWBmGf2ZpzL9uAMw2WwZ3Ks14za/PerbFW1rqC6w4CH9eoHbO/Xch7EDV66fd9jv0D7CiybqOG1vu52J5kN5dcexmwxxc0G/fXqP9uWcm9bPb6x4EnyqwtIiIiIiIiIiIiIiIiIiIS/iceAP1cIbOOhpxVAAAAAElFTkSuQmCC"
                                                />
                                            </defs>
                                        </svg>
                                        <a 
                                            href={tidbit.links[0].link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={
                                                isLightModeByMariePierreLessard
                                                    ? flexcontainerstyling.lightThemeLink
                                                    : flexcontainerstyling.darkThemeLink
                                            }  
                                        >
                                            Read more
                                        </a>
                                    </footer>
                                </CardBodyByMariePierreLessard>
                            </CardWithArticleByMariePierreLessard>
                        </li>
                    )
                })}
            </FlexContainerWithUlByMariePierreLessard>
            {/* Anisul Islam advises on YouTube to install the Node package
            react-router-hash-link in order to navigate from one point of a page to the other.
            The component used then has to be HashLink, not NavLink. 
            With HashLink, the to= attribute is given the same value as with the corresponding HTML attribute: 
            to="#globalFooter" 
            Source: 
            https://www.youtube.com/watch?v=T54u2lIhmc0 
    
            "Install
            npm i react-router-hash-link
            This is a solution to React Router's issue of not scrolling to #hash-fragments when using the <Link> component to navigate. (...)
            Note that you must use React Router's BrowserRouter for this to work."
            https://www.npmjs.com/package/react-router-hash-link
    
            Error message in VSC:
            Could not find a declaration file for module 'react-router-hash-link'. 'c:/2025/TC/erhvervsfag/github/react-gallery-wrapper/_ROOT/node_modules/react-router-hash-link/dist/react-router-hash-link.cjs.js' implicitly has an 'any' type.
            Try `npm i --save-dev @types/react-router-hash-link` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-router-hash-link';`
            */}
            <HashLink
                to="#top"
                className={mainstyling.upArrowByMariePierreLessard}
            >
                <svg
                    width="59"
                    height="59"
                    viewBox="0 0 59 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <rect width="59" height="59" fill="url(#pattern0_18_308)" />
                    <defs>
                        <pattern id="pattern0_18_308" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_18_308" transform="scale(0.01)" />
                        </pattern>
                        <image
                            id="image0_18_308"
                            width="100"
                            height="100"
                            preserveAspectRatio="none"
                            xlinkHref="data:image/png;base64,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"
                        />
                    </defs>
                </svg>
            </HashLink>
        </>
    );
};