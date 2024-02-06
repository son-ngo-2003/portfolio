import { useEffect } from 'react';
import { getTest } from './services/testDB';

function App() {
    useEffect( () => {
        getTest();
    } ,[])

    return (
        <>
            <h1 className="">
                Hello, World!
            </h1>
        </>
    )
}

export default App
