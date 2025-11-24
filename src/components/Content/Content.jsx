import React, { useEffect, useState } from "react";
import Example from "../table/Tableau";
import ConfirmationModal from "../mouvements/modale/Modale";
import { useNavigate } from "react-router-dom";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Header from "../Header";
import { Loader, LoaderCircle } from "lucide-react";
import { tableauObjets } from "../../data/data";

const Content = () => {
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState();
  const [afficheModale, setAfficheModale] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const rediriger = () => {
    navigate("/ajoutMateriel");
  };

  const handleFermerModale = () => {
    setAfficheModale(false);
  };

  const GetData = () => {
    /* AxiosInstance.get("materiel/").then((res) => {
      console.log(res.data);
      setMyData(res.data);
      setLoading(false);
    }); */
    setMyData(tableauObjets);
  };

  useEffect(() => {
    GetData();
  }, []);

  console.log(tableauObjets);

  return (
    <div className="w-full h-screen overflow-y-auto">
      <Header />
      <div className=" flex items-center justify-center flex-col mb-5">
        <div className="h-20 w-full flex items-center justify-center gap-2.5">
          <button
            onClick={rediriger}
            class="bg-blue-500 hover:bg-sky-700 text-white p-2 rounded-lg transition delay-100 duration-300 shadow-2xl text-[14px]"
          >
            Nouveau matériel
          </button>
          <button class="bg-blue-500 hover:bg-sky-700 text-white p-2 rounded-lg transition delay-100 duration-300 shadow-md text-[14px]">
            actualiser
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          <Example
            myData={tableauObjets}
            setAfficheModale={setAfficheModale}
            setId={setId}
          />
        )}
      </div>

      {afficheModale ? (
        <ConfirmationModal
          afficheModale={afficheModale}
          onClose={handleFermerModale}
          val={false}
          id={id}
          actualiserData={GetData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Content;
