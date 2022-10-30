import { useContext } from "react";
import { itemContext } from "./itemContext";



export default function BrandSelector(props) {
    const { setSelectedBrand, setItemsList } = useContext(itemContext);

    function handleSelect() {
        const input = document.getElementById('brand-selector')
        const selectedVal = input.value;
        const options = input.list.childNodes;
        if(!input.value) {
            setSelectedBrand(null)
            setItemsList([])
        };
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === selectedVal) {
                setSelectedBrand(parseInt((options[i].id)))
            }
        }
    }

    return (
        <>
            <label htmlFor="brand-selector">Which Brand?</label>
            <input list="brands" id="brand-selector" name="brand-selector" onInput={() => handleSelect()} />
            <datalist id="brands">
                {props.brands.map(brand => {
                    const id = brand.brand_id
                    return (
                        <option key={id} value={brand.name} id={id} />
                    )
                })}
            </datalist>
        </>
    )

}