import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/Homepage/Homepage";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import ChatPage from "./routes/chatPage/ChatPage";

import RootLayout from "./layouts/rootlayout/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import SigninPage from "./routes/signinPage/SigninPage";
import SignupPage from "./routes/signupPage/SignupPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in/*",  // ✅ Added wildcard
        element: <SigninPage />,
      },
      {
        path: "/sign-up/*",  // ✅ Added wildcard
        element: <SignupPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import HomePage from "./routes/Homepage/Homepage";
// import DashboardPage from "./routes/dashboardPage/DashboardPage";
// import ChatPage from "./routes/chatPage/ChatPage";

// import RootLayout from "./layouts/rootlayout/RootLayout";
//  import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
// import SigninPage from "./routes/signinPage/SigninPage";
// import SignupPage from "./routes/signupPage/SignupPage";






// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },


// {
//         path: "/sign-in",
//         element: <SigninPage />,
//       },


// {
//         path: "/sign-up",
//         element: <SignupPage />,
//       },



//       {
//         element: <DashboardLayout />,
//         children: [
//           {
//             path: "dashboard",
//             element: <DashboardPage />,
//           },
//           {
//             path: "dashboard/chats/:id",
//             element: <ChatPage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

