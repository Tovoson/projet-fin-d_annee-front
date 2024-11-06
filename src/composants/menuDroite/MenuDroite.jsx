import React, { useEffect, useState } from 'react'
import './menuDroite.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Droite = () => {

    const [visible, setVisible] = useState(false)
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
        setAdminData(JSON.parse(storedAdmin));
        }
    }, []);

    const handlevisible = () =>{
        setVisible(!visible)
    } 

    return (
        <div className='cont'>
            <div onClick={handlevisible} className='dots'>
                <MoreVertIcon />
            </div>
                <div className="avatar">
                    { visible ?
                    <>
                        <div className="cercle">
                            <img src={ adminData ? adminData.photo_admin : './bgc.png'} alt="" />
                        </div>
                        <span>{adminData.nom_admin}</span>
                     </> : ''}
                </div>
            { visible ?
                <div className="m-droite" >
                    
                    <div className="contenu">
                        <div className="img">
                            <div className="cercle">
                                <img src={ adminData ? adminData.photo_admin : './bgc.png'} alt="" />
                                <div className="infos">
                                    <span>{adminData.id_admin}</span>
                                    <span>{adminData.nom_admin}</span>
                                </div>
                            </div>
                            <span>Bonjour {adminData.nom_admin}</span>
                        </div>
                        <div className="info">
                            <h2>Informations</h2>
                            <p>identifiant : {adminData.id_admin}</p>
                            <p>Nom : {adminData.nom_admin}</p>
                            
                        </div>
                    </div>
                </div>
            : <div className="m-dt">
                <div className="cercle">
                    <img src={ adminData ? adminData.photo_admin : './bgc.png'} alt="" />
                </div>
              </div>
            }
        </div>
    )
}

export default Droite