import { error } from "console";
import { createContext,useContext } from "react";
import { useState } from "react";

interface ContextProviderProps{
      children : React.ReactNode
}

interface AggregatedData {
      totalQuantity : number,
      totalPrice : number, 
      selectedCount : number
}  

interface AssetContextType {
      currentAsset: AggregatedData | null;
      setCurrentAsset: (asset: AggregatedData) => void;
    }

const sellContext = createContext<AssetContextType | undefined>(undefined)

export const SellContextProvider : React.FC<ContextProviderProps> = ({children}) => {
      const [currentAsset, setCurrentAsset] = useState<AggregatedData | null>(null);
      return (
      <sellContext.Provider value={{ currentAsset, setCurrentAsset }}>
            {children}
      </sellContext.Provider>
      );
};

export const useSellContext = () => {
      const  data = useContext(sellContext)
       if (!data){
        throw new Error ("use sell context within provider")
       }
       return data;
}