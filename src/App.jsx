// import FlatsPage from "./Pages/FlatPage/Flat"
import Home from "./Pages/HomePage/Home.jsx";
import FlatPage from "./Pages/FlatPage/Flat.jsx";
import LuxuryPage from "./Pages/LuxuryPage/Lux.jsx";
import { useQuery, gql } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



function App() {
  // add a query list
  const GET_HOMES = gql`
    query {
      listFlats {
        data {
          coverImage
          name
          address
          price
        }
      }
      listLuxHomes {
        data {
          coverImage
          name
          address
          price
        }
      }
    }
  `;

  // step3: Add instances for the data
  const { loading, error, data } = useQuery(GET_HOMES);
  if (loading)
    return <p className="container">Getting all avaliable flats...</p>;
  if (error) return <p className="container">An error occurred:(</p>;
  // console.log (data.listFlats.data)

  const flatsData = data.listFlats.data;
  const luxData = data.listLuxHomes.data;
  // console.log(flatsData);
  // console.log(luxData);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/flats-section",
      element: <FlatPage flats={flatsData}/>,
    },
    {
      path: "/luxury-section",
      element: <LuxuryPage luxContent={luxData} />,
    },
  ]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
