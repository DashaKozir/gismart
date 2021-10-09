import './App.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import CreateForm from "./components/Form/CreateForm";
import UserList from "./components/User/UserList";
import Header from "./components/Header/Header";

const App = () => {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    useEffect( () => {
        const headers = {
            'app-id': '6154537832884b1a024b2f3c',
            'Content-Type': 'application/json'
        }
        if (fetching) {
            setLoading(true)
            axios.get(`https://dummyapi.io/data/v1/user?_limit=20&_page=${currentPage}`, {headers})
                .then(res => {
                    setLoading(false)
                    setAllUsers([...allUsers, ...res.data.data])
                    setCurrentPage(prevState => prevState + 1)
                })
                .catch(() => setError('Error. The list if users does not received'))
                .finally(() => setFetching(false))
        }
    },[fetching])

    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    },[])

    const showForm = () => {
        setShow(!show)
    }

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
            setFetching(true)
        }
        // console.log('scrollHeight', e.target.documentElement.scrollHeight )
        // console.log('scrollTop', e.target.documentElement.scrollTop )
        // console.log('innerHeight', window.innerHeight )
    }

        return (
            <>
                <Header onClick={showForm}/>
                {loading && <p className='loading'>Loading...</p>}
                {error && <div>{error}</div>}
                <UserList allUsers={allUsers}/>
                {show &&<CreateForm showForm={showForm}/>}
            </>
        )
}

export default App;
