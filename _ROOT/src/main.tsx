import { createRoot } from "react-dom/client";
import "./index.scss";
import { ThemeContextProviderByMariePierreLessard } from "./context/ThemeContextProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("rootByMariePierreLessard")!).render(
    <ThemeContextProviderByMariePierreLessard>
        <App />
    </ThemeContextProviderByMariePierreLessard>
);
