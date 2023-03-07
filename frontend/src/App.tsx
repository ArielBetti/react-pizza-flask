import { useEffect, useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";

import pizzaPgn from "./assets/pizza.jpg";
import { Input, Modal } from "./components";

export type TPizza = {
  id: number;
  name: string;
  value: number;
  ingredients: string[];
};

function App() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<TPizza | undefined>(
    undefined
  );
  const [pizzas, setPizzas] = useState<TPizza[]>([]);

  const getMenu = async () => {
    await fetch(`${import.meta.env.VITE_FLASK_BASE_URL}/cardapio`)
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  };

  const editPizza = async (pizza: TPizza) => {
    await fetch(`${import.meta.env.VITE_FLASK_BASE_URL}/cardapio/${pizza.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then((res) => res.json)
      .then((data) => data);

    getMenu();
  };

  const handleEditPizza = (pizza: TPizza) => {
    setSelectedPizza(pizza);
    setOpenEditModal(true);
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="mx-auto container max-w-2xl gap-2 px-4 h-screen flex flex-col items-start justify-center">
      <Modal
        onCofirm={(pizza) => editPizza(pizza)}
        pizza={selectedPizza}
        setModalOpen={setOpenEditModal}
        open={!!(openEditModal && selectedPizza)}
      />
      {pizzas?.map((pizza, index) => (
        <div
          key={crypto.randomUUID()}
          className="w-full flex py-2 px-4 items-center justify-between max-h-32 bg-zinc-900 rounded-md shadow-md"
        >
          <div className="gap-2 w-full flex p-2 items-start justify-start">
            <img
              className="h-20 w-20 rounded-md shadow-md"
              src={pizzaPgn}
              alt={`Ilustração da pizza sabor ${pizza.name}`}
            />
            <div className="flex flex-col">
              <h1 className="m-0 p-0 font-semibold text-lg text-white">
                {pizza.name}
              </h1>
              <div className="flex font-light text-sm flex-wrap gap-2">
                {pizza?.ingredients?.map((ingredient, index) => (
                  <p
                    key={`${ingredient}-${index}-${crypto.randomUUID()}`}
                    className="text-zinc-300"
                  >
                    {ingredient}
                  </p>
                ))}
              </div>
              <p className="text-green-500">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pizza.value)}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleEditPizza(pizza)}
            key={pizza.id}
            className="bg-red-500 rounded-md shadow-md flex items-center justify-center w-10 h-10"
          >
            <PencilIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
