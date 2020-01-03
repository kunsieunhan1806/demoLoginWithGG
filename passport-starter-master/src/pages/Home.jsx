import React from "react";
import Terminal from "../components/displays/terminal";
import cardList from "../components/cards/cardList";

const Home = () =>{
    return(
        <div className='page' style={{textAlign:"center"}}>
            <p className="page-title">Simple OAuth With Nodejs</p>
            <p style={{fontSize:20}}>
                Passport.js contains support for over
                <span style={{color: "var(--primary-red)"}}>500+</span>
                Get Start
            </p>
            <Terminal 
                userData={"passport.authenticate('facebook')"}
                selected="All"
            />
            <p style={{fontSize:28}}>
                Popluar Strategies
            </p>
            <cardList />
            <div style={{marginBottom:20}}></div>
        </div>
    );
};

export default Home;