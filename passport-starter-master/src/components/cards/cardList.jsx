import React from "react";
import card from './card';
import { data } from "../../data";

const cardList = () =>{
    return data.map(app=>{
        return(
            <card {...app} key={app.name}></card>
        );
    });
};
export default cardList;