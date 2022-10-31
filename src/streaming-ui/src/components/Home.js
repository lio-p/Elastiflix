import Nav from "./Nav";
import Header from "./Header";
import Recommended from "./Recommended";
import Popular from "./Popular";
import Recent from "./Recent";
import React, {useState, useEffect} from "react";


function Home() {

    const [user, setUser] = useState()
    
    return (
        <div className="app">
            <Nav showSearch={true} setUser={setUser}/>
            <Header />
            <div className="recommendations">
                <Recommended user={user}/>
                <Popular />
                <Recent />
            </div>
        </div>
    )
}

export default Home
