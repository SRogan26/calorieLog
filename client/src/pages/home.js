import { useContext, useState, useEffect } from "react"
import EntryList from "../components/home/entryList"
import { userContext } from '../components/userContext'

export default function Home() {
    const [activeUser] = useContext(userContext)
    const [entryList, setEntryList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/entries/" + activeUser.id)
            .then(res => res.json())
            .then(entries => {
                console.log(entries)
                setEntryList(entries)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="dashboard">
            {entryList[0] && <EntryList entries={entryList}/>}
        </div>
    )
}