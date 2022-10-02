export default function ItemDisplay(props){
    return (
        <ul style={{listStyle: 'none', padding: 0}}>
            <li><h3>{document.getElementById('brand-selector').value}</h3></li>
            <li style={{fontWeight: 'bolder'}}>{props.item.name}</li>
            <li>Cals: {props.item.calories}</li>
            <li>Fat: {props.item.fat}g</li>
            <li>Carbs: {props.item.carbs}g</li>
            <li>Protein: {props.item.protein}g</li>
        </ul>
    )
}