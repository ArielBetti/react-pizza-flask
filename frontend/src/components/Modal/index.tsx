import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// icons
import { XMarkIcon } from "@heroicons/react/24/outline";

// radix: components
import * as Dialog from "@radix-ui/react-dialog";
import Input from "../Input";
import CurrencyInput from "../CurrencyInput";
import { TPizza } from "../../App";

export type TModalProps = {
  pizza: TPizza | undefined;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  onCofirm: (pizza: TPizza) => void;
};

// ::
const Modal = ({ open, pizza, setModalOpen, onCofirm }: TModalProps) => {
  const [pizzaName, setPizzaName] = useState("");
  const [pizzaPrice, setPizzaPrice] = useState(0);

  useEffect(() => {
    setPizzaName(pizza?.name || "");
    setPizzaPrice(pizza?.value || 0);
  }, [open, pizza]);

  if (!open || !pizza) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-red-900/40 motion-safe:animate-blurIn" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl flex min-h-screen items-center justify-center text-black dark:text-white">
          <div className="animate-upSlide relative p-4 flex flex-col items-start justify-start h-full bg-zinc-900 rounded-md min-h-[400px] w-full max-w-lg">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-white font-bold text-lg">Editar</h2>
              <Dialog.Close className="bg-red-500 p-1 rounded-md flex items-center justify-center">
                <XMarkIcon className="h-5 w-5" />
              </Dialog.Close>
            </div>
            <div className="flex flex-col mt-5 w-full">
              <div className="text-white mt-5 flex flex-col gap-2 w-full max-w-sm">
                <Input
                  value={pizzaName}
                  onChange={(e) => setPizzaName(e.target.value)}
                  placeholder="Escreva um nome"
                />
                <CurrencyInput
                  baseValue={pizzaPrice}
                  onChange={(e) => setPizzaPrice(e)}
                />
                <div className="mt-5">
                  <button
                    onClick={() =>
                      onCofirm({
                        ...pizza,
                        name: pizzaName,
                        value: pizzaPrice,
                      })
                    }
                    className="bg-green-600 rounded p-2 text-white"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
