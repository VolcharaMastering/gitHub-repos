import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./routes/AdminPage/AdminPage.tsx";
import Repositories from "./routes/Repositories/Repositories.tsx";
import Root from "./routes/Root/Root.tsx";
import NotFound from "./routes/NotFound/NotFound.tsx";
import "./index.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <NotFound />,
        children: [
            { index: true, element: <AdminPage /> }, // root is admin pannel
            { path: "settings", element: <AdminPage /> },
            { path: "repositories", element: <Repositories /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
