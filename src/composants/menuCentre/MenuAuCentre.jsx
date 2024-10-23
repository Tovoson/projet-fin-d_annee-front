import React, { useEffect, useState } from 'react'
import './menuCentre.scss'
import DenseTable from '../table/Tableau';
import Recherche from '../recherche/Recherche';
import AxiosInstance from '../Axios';
import Example from '../table/Tableau';

const Centre = () => {
    const [loading, setLoading] = useState(true)
    const [myData, setMyData] = useState()

    const GetData = () =>{
        AxiosInstance.get('materiel/').then((res)=>{
            console.log(res.data)
            setMyData(res.data)
            setLoading(false)
        })
    }

    useEffect(()=>{
        GetData();
    },[])

    return (
        <div className="m-centre">
            <Recherche val ={true} />
            
            
            <div className="tableau">
                {/* <DenseTable 
                    IdMat = {'idMats'} 
                    Nom = {'Nom'} 
                    Nombre = {"Nombre"} 
                    Status = {"Status"}
                    DateEnr = {"Date Enr"}/> */}

                {loading ? 
                    <h2>Données en chargement ...</h2>
                    : <Example myData = {myData} />}
            </div>
        </div>
    )
}

export default Centre