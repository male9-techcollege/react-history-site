/* Source for the creation of pages:
react-router-codealong-med-kasper
react-wallywood-codealong-med-kasper (useFetch; mapping of elements inside of JSX template)
*/
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import type { TodayMuffinLabs } from "../types/today";
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
    const eventArray = data?.data.Events;

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

    return (
        <>
            {/* TO DO : this class is temporary
            on desktops, flexbox has to use :nth-child(odd) to send certain cards to the right 
            and change the position of the content of these cards if they are children of the cards to the right. 
            The timeline (vertical line) has to have z-index 1
            and the horizontal lines a z-index of 2 to go over that vertical line */}
            <FlexContainerByMariePierreLessard className={flexcontainerstyling.unresponsiveFlexContainerWoPassePartoutAlwaysVerticalByMariePierreLessard}>
                {eventArray?.map((tidbit) => {
                    return (
                        <>
                            <CardWithArticleByMariePierreLessard
                                key={tidbit.text}
                                className={gridstyling.unresponsiveGridWoPassePartoutByMariePierreLessard}
                            >
                                <HeadingElByMariePierreLessard
                                    headingNr={2}
                                    headingText={`Year: ${tidbit.year}`}
                                />
                                <CardBodyByMariePierreLessard
                                    bodyContent={tidbit.text}
                                />
                                <CardFooterByMariePierreLessard>
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
                                    <a href={tidbit.links[0].link} target="_blank" rel="noopener noreferrer">
                                        Read more
                                    </a>
                                </CardFooterByMariePierreLessard>
                            </CardWithArticleByMariePierreLessard>
                        </>
                    )
                })}
            </FlexContainerByMariePierreLessard>
        </>
    );
};