import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { MainView } from "../view/Main.view";
import { NotFoundView } from "../view/NotFound.view";
import { BountyDetailsView } from "../view/BountyDetails.view";

export const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "*",
      element: <NotFoundView />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "main", element: <MainView /> },
        { path: "bounty/:id", element: <BountyDetailsView /> },
      ],
    },
  ]);
  return routes;
};
