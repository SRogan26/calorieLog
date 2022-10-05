import { useContext, useEffect } from "react";
import { itemContext } from "./itemContext";



export default function ItemInput(props) {
    const { selectedBrand, setSelectedItemId, setSelectedItemObj } = useContext(itemContext);

    useEffect(()=>{
        const input = document.getElementById('item-selector');
        input.value = '';
        setSelectedItemObj({});
    }, [selectedBrand]);

    function handleSelect() {
        const input = document.getElementById('item-selector')
        const selectedVal = input.value;
        const options = input.list.childNodes;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === selectedVal) {
                setSelectedItemId(parseInt((options[i].id)))
            }
        }
    }

    return (
        <>
            <label htmlFor="item-selector">Which Item?</label>
            <input list="items" id="item-selector" name="item-selector" onInput={() => handleSelect()} />
            <datalist id="items">
                {props.items.map(item => {
                    const id = item.item_id
                    return (
                        <option key={id} value={item.name} id={id} />
                    )
                })}
            </datalist>
        </>
    )

}