import { useState, useEffect } from "react";
import { itemContext } from "./itemContext";
import BrandSelector from "./brandSelect";
import ItemInput from "./itemInput";
import ItemDisplay from "./itemDisplay";

export default function ItemSelection() {
    const [brandsList, setBrandsList] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemObj, setSelectedItemObj] = useState({});

    //gets list of all brands
    useEffect(() => {
        fetch("http://localhost:3001/api/brands")
            .then(res => res.json())
            .then(brands => {
                setBrandsList(brands)
            })
            .catch(err => console.log(err))
    }, [])
    //Gets items by brand id
    useEffect(() => {
        if (!selectedBrand) return;
        fetch("http://localhost:3001/api/items/by-brand/" + selectedBrand)
            .then(res => res.json())
            .then(items => {
                setItemsList(items)
            })
            .catch(err => console.log(err))
    }, [selectedBrand])
    //gets selected item by item id
    useEffect(() => {
        if (!selectedItemId) return;
        fetch("http://localhost:3001/api/items/" + selectedItemId)
            .then(res => res.json())
            .then(result => {
                setSelectedItemObj(result[0])
            })
            .catch(err => console.log(err))
    }, [selectedItemId])

    return (
        <itemContext.Provider value={{ selectedBrand, setSelectedBrand, selectedItemId, setSelectedItemId, setSelectedItemObj }}>
            <div className="itemsInputArea">
                {brandsList.length && <BrandSelector brands={brandsList} />}
                {itemsList && itemsList.length > 0 && <ItemInput items={itemsList} />}
            </div>
            <div className="item-display">
            {selectedItemObj.name && <ItemDisplay item={selectedItemObj} />}
            </div>
        </itemContext.Provider>
    )

}