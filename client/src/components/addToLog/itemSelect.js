import { useState, useEffect, useContext } from "react";
import { itemContext } from "./itemContext";
import BrandSelector from "./brandSelect";
import ItemInput from "./itemInput";
import ItemDisplay from "./itemDisplay";
import TimeInput from "./timeInput";
import { userContext } from "../userContext";
import AddNewItemForm from "./addNewItem";

export default function ItemSelection() {
    const [activeUser] = useContext(userContext);
    const [brandsList, setBrandsList] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemObj, setSelectedItemObj] = useState({});
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    
    const resetSelections = () => {
        setItemsList([])
        setSelectedBrand(null);
        setSelectedItemId(null);
        setSelectedItemObj({});
        setDate(null);
        setTime(null);
    }
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
                setSelectedItemObj(result)
            })
            .catch(err => console.log(err))
    }, [selectedItemId])

    const handleSubmit = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "entry": {
                 "time": `${date} ${time}`,
                 "item": selectedItemId,
                 "user":  activeUser.id
                }
             })
        }
        fetch("http://localhost:3001/api/entries/", options)
            .then(res => res.json())
            .then(result => {
                const brandInput = document.getElementById('brand-selector')
                alert(`${brandInput.value} ${selectedItemObj.name} added to ${activeUser.name}'s calorie log: ${result.time}`)
                resetSelections();
                brandInput.value = null;
            })
            .catch(err => console.log(err))
    }
    const handleAddNew = () => {
        const newItemForm = document.getElementById('new-item-modal');
        newItemForm.style.display = 'block';
    }
    return (
        <itemContext.Provider value={{ selectedBrand, setSelectedBrand, setItemsList, selectedItemId, setSelectedItemId, setSelectedItemObj, date, setDate, time ,setTime}}>
            <div className="itemsInputArea">
                {brandsList.length && <BrandSelector brands={brandsList} />}
                {itemsList && itemsList.length > 0 && <ItemInput items={itemsList} />}
                {selectedItemObj.name && <TimeInput/>}
                {date && time && <button onClick={() => handleSubmit()}>Add Log Entry?</button>}
            </div>
            <div className="item-display">
            <AddNewItemForm brands={brandsList}/>
            {!selectedItemObj.name && <button onClick={() => handleAddNew()}>Add New Item?</button>}
            {selectedItemObj.name && <ItemDisplay item={selectedItemObj} />}
            </div>
        </itemContext.Provider>
    )

}