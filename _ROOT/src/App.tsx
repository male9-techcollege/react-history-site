/* TO DO: delete project-specific styling and components that weren't reused before delivery */

/* Projektopgave: History Site
Opgavebeskrivelse:
Byg en side der kan vise historiske begivenheder (events) igennem tidens løb. 
Siden har følgende opgavekrav:
FÆRDIG - Der skal optræde tre undersider styret med React Router
- Der skal på "Today" siden hentes data for dagens dato
- Der skal på "By Date" siden være mulighed for selv at indtaste en dato og dataen skal ændres til kun at vise begivenheder på denne dato
- Der skal på "Since" siden være mulighed for at vælge et årstal og alt data skal være fra dette år og fremefter
- Der skal være mulighed for at skifte tema på siden
- Der skal være mulighed for at trykke på "læs mere" knappen ud fra hver teaser tekst og dette link skal føre til den pågældende wikipedia artikel. 
- Siden skal være semantisk korrekt 
- Der skal også være et mobil design med tilhørende breakpoints. 
- Designet skal følge det udleverede design
OK - Styling skal foregå med enten SCSS modules eller styled components. 
Bonus:
FÆRDIG - Der skal være en "back to top" knap som fører brugeren tilbage til toppen
- Der skal være "lazy loading" som først loader de næste 10 artikler når brugeren er scrollet ned til bunden. 
*/

/* Source for the creation of a router, incl. course notes:
react-router-codealong-med-kasper
*/
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.scss";

import { GlobalLayoutByMariePierreLessard } from "./layouts/global-layout";
import { TodayByMariePierreLessard } from "./pages/home";
import { OnThisDateByMariePierreLessard } from "./pages/on-this-date";
import { SinceThatYearByMariePierreLessard } from "./pages/since-that-year";
import { ErrorPageByMariePierreLessard } from "./pages/notfound";

/* Source for way to fold regions in .jsx files: https://stackoverflow.com/questions/58882591/region-for-jsx */
// #region Sources about routing (3 routing modes; client-side routing vs. server-side routing), routes, slugs
/* Declarative routing (simple compared to other options)
The following will give:
http://localhost:port/<enter path here; include initial slash in relative path, obviously!>

"There are three primary ways, or "modes", to use it in your app, so there are three guides to get you started.
Declarative
Data
Framework"
https://reactrouter.com/home

Question I asked myself: what is the difference between a slug and a route?
A slug is part of a route. The slug doesn't include the slash, as the following source shows.
"When Next.js sees this folder:
app/blog/[slug]/page.js
It understands:
[slug] is a variable
This page can handle any blog URL
The value will come from the URL itself"
https://medium.com/codetodeploy/dynamic-routes-slugs-in-next-js-how-real-world-apps-design-their-urls-16f681869c21

Reading about client-side routing with BrowserRouter vs. server-side routing:
"A declarative <Router> using the browser History API for client-side routing. (...)
<Route> components describing your route configuration"
https://reactrouter.com/api/declarative-routers/BrowserRouter

"2. How does client-side routing in React Router differ from traditional server-side routing?
In client-side routing (used by React Router), only a portion of the page changes when navigating between routes, as React handles the navigation and updates the URL without a page reload. In server-side routing, each navigation request triggers a full page load from the server, causing the entire page to reload.
3. What is the purpose of <BrowserRouter>, and how does it differ from <HashRouter>?
<BrowserRouter> uses the HTML5 history API to create clean, user-friendly URLs without hash symbols. <HashRouter>, on the other hand, uses the hash portion of the URL (e.g., /#) and is useful for simpler setups where you want to avoid configuring the server to handle different paths."
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0

Research about <Routes> and <Route>:
The following are component routes according to the react-router documentation.
"Component Routes
You can also use components that match the URL to elements anywhere in the component tree: (...)
Note that these routes do not participate in data loading, actions, code splitting, or any other route module features,
so their use cases are more limited than those of the route module."
https://reactrouter.com/start/framework/routing
In that documentation page, the component called <Routes> is only used with
individual <Route> elements (component routes)
and vice versa.
"5. What is the <Switch> (or <Routes> in v6) component, and why is it useful?
<Switch> (in v5) or <Routes> (in v6) renders the first matching route within its children, ensuring that only one route is rendered at a time. In React Router v6, <Routes> replaced <Switch> to offer a more streamlined API."
https://souvikmajumder31.medium.com/full-stack-developer-interview-questions-2024-part-1-react-js-fb2a413099d0

*/
// #endregion 

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* The layout route has no path attribute.
                    It contains the elements with a path attribute which will be rendered with the given CSS styling for the layout. */}
                    {/* The element= prop of <Route> is for the component declared in pages or layouts folder. */}
                    <Route element={<GlobalLayoutByMariePierreLessard />} >
                        {/* It is possible to write the following instead of index: 
                        <Route path="/" element={<Home />} />
                        */}
                        <Route index element={<TodayByMariePierreLessard />} />
                        <Route path="/by-date" element={<OnThisDateByMariePierreLessard />} />
                        <Route path="/since" element={<SinceThatYearByMariePierreLessard />} />
                        {/* Fallback page, i.e. error 404 page (in case user enters wrong URL) 

                        The wildcard (*) means all paths. In previous versions of react-router, this path with a wildcard had to be listed
                        at the end because the routes were read in order. Now, it doesn't seem to matter. 
                        */}
                        <Route path="/*" element={<ErrorPageByMariePierreLessard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
