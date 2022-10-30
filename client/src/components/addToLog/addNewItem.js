import { useContext, useEffect, useReducer, useState } from "react";
import { userContext } from "../userContext";
import { itemContext } from "./itemContext";
const brandURL = 'http://localhost:3001/api/brands';
const itemURL = 'http://localhost:3001/api/items/';

const ACTIONS = {
    CHANGE_NAME: 'change_name',
    CHANGE_CAL: 'change_cal',
    CHANGE_FAT: 'change_fat',
    CHANGE_CARB: 'change_carb',
    CHANGE_PRO: 'change_pro',
    CLEAR: 'clear'
}
const INIT_STATE = {
    name: null,
    cal: null,
    fat: null,
    carb: null,
    pro: null
}
function itemReducer(state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_NAME:
            return ({
                ...state,
                name: action.newVal
            });
        case ACTIONS.CHANGE_CAL:
            return ({
                ...state,
                cal: action.newVal
            });
        case ACTIONS.CHANGE_FAT:
            return ({
                ...state,
                fat: action.newVal
            });
        case ACTIONS.CHANGE_CARB:
            return ({
                ...state,
                carb: action.newVal
            });
        case ACTIONS.CHANGE_PRO:
            return ({
                ...state,
                pro: action.newVal
            });
        case ACTIONS.CLEAR:
            return ({ ...INIT_STATE })
        default:
            throw Error('Unknown Action: ' + action.type);
    }
}
export default function AddNewItemForm(props) {
    const { selectedBrand, setSelectedBrand, setItemsList, date, setDate, time, setTime } = useContext(itemContext);
    const [activeUser] = useContext(userContext);
    const [item, dispatch] = useReducer(itemReducer, INIT_STATE);
    const [newBrandName, setNewBrandName] = useState(null)

    function clearAll() {
        setNewBrandName(null)
        setSelectedBrand(null);
        setItemsList([])
        dispatch({ type: ACTIONS.CLEAR });
        setDate(null);
        setTime(null);
        document.getElementById('new-item-modal').style.display = 'none'
    }
    //Clears Date and Time state if any values get erased from item fields
    useEffect(() => {
        if (!Object.values(item).every(value => value)) {
            setDate(null);
            setTime(null);
        }
    }, [item])
    //Clears all state if newBrand blank is cleared
    useEffect(() => {
        if (!newBrandName && !selectedBrand) {
            dispatch({ type: ACTIONS.CLEAR });
            setDate(null);
            setTime(null);
        }
    }, [newBrandName])

    const handleBrandChange = (e) => {
        if (selectedBrand) {
            setSelectedBrand(null);
            setItemsList([])
            document.getElementById('new-selector').value = null;
        }
        setNewBrandName(e.target.value)
    }

    function handleSelect() {
        const input = document.getElementById('new-selector')
        const selectedVal = input.value;
        const options = input.list.childNodes;
        if (!input.value) {
            setSelectedBrand(null)
            setItemsList([])
        };
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === selectedVal) {
                setSelectedBrand(parseInt((options[i].id)))
            }
        }
        if (newBrandName) {
            setNewBrandName(null)
            document.getElementById('new-brand').value = null;
        }
    }

    async function handleSubmit() {
        let brandId;
        if (!selectedBrand) {
            const brandOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newBrandName
                })
            }
            const postedBrand = await (await fetch(brandURL, brandOptions)).json()
            brandId = postedBrand.brand.brand_id;
        } else brandId = selectedBrand;
        const itemOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                calories: item.cal,
                fat: item.fat,
                carbs: item.carb,
                protein: item.pro,
                brand_id: brandId
            })
        }
        const postedItem = await (await fetch(itemURL, itemOptions)).json();
        const itemId = postedItem.item.item_id;
        const logOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "entry": {
                    "time": `${date} ${time}`,
                    "item": itemId,
                    "user": activeUser.id
                }
            })
        }
        fetch("http://localhost:3001/api/entries/", logOptions)
            .then(res => res.json())
            .then(result => {
                alert(`${postedItem.item.name} was created and added to ${activeUser.name}'s calorie log: ${result.time}`)
                clearAll();
            })
            .catch(err => console.log(err))
    }

    return (
        <div id='new-item-modal' style={{ display: 'none' }}>
            <button id='modal-x' onClick={() => { document.getElementById('new-item-modal').style.display = 'none' }}>X</button>
            <div id='new-item-content'>
                <h1>Create and Add to Log</h1>
                {/* Brand Selector */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <label htmlFor="new-selector">Which Brand?</label>
                        <input list="brands" id="new-selector" name="new-selector" onInput={() => handleSelect()} />
                        <datalist id="brands">
                            {props.brands.map(brand => {
                                const id = brand.brand_id
                                return (
                                    <option key={id} value={brand.name} id={id} />
                                )
                            })}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="new-brand">Or Add New Brand:</label>
                        <input id='new-brand' type='text' onChange={(e) => { handleBrandChange(e) }}></input>
                    </div>
                </div>
                {/* Item Fields */}
                {(selectedBrand || newBrandName) && <div>
                    <form style={{ display: 'flex', flexDirection: 'column', width: 'max-content', marginLeft: '33%' }}>
                        <div className="item-form-input">
                            <label htmlFor='item-name'>Item Name:</label>
                            <input type='text' id='item-name' name='item-name' placeholder="Enter Item Name"
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.CHANGE_NAME,
                                        newVal: e.target.value
                                    })
                                }} />
                        </div>
                        <div className="item-form-input">
                            <label htmlFor='item-cals'>Calories:</label>
                            <input type='number' id='item-cals' name='item-cals' placeholder="Enter Calories"
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.CHANGE_CAL,
                                        newVal: e.target.value
                                    })
                                }} />
                        </div>
                        <div className="item-form-input">
                            <label htmlFor='item-fat'>Fat:</label>
                            <input type='number' id='item-fat' name='item-fat' placeholder="Enter Fat"
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.CHANGE_FAT,
                                        newVal: e.target.value
                                    })
                                }} />
                        </div>
                        <div className="item-form-input">
                            <label htmlFor='item-carb'>Carbs:</label>
                            <input type='number' id='item-carb' name='item-carb' placeholder="Enter Carbs"
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.CHANGE_CARB,
                                        newVal: e.target.value
                                    })
                                }} />
                        </div>
                        <div className="item-form-input">
                            <label htmlFor='item-pro'>Protein:</label>
                            <input type='number' id='item-pro' name='item-pro' placeholder="Enter Protein"
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.CHANGE_PRO,
                                        newVal: e.target.value
                                    })
                                }} /><br />
                        </div>
                    </form>
                </div>}
                {/* Date and Time fields */}
                {(Object.values(item).every(value => value)) && <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <label htmlFor="day-new" > What Day?</label>
                        <input type="date" id="day-new" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="time-new"> What Time?</label>
                        <input type="time" id="time-new" onChange={(e) => setTime(e.target.value)} />
                    </div>
                </div>}
                {/* Submit Button (eventually xd) */}
                {(date && time) && <button onClick={() => { handleSubmit() }}>Check It Out Now</button>}
            </div>
        </div>
    )
}