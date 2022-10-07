import { Link } from 'react-router-dom';

export default function Navbar() {
    
    return (
        <div id="navigator">           
            <Link to={`/home`}>HOME</Link>
            <Link to={`/add`}>ADD TO LOG</Link>
        </div>
    )
}