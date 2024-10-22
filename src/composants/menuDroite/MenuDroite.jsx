import React, { useState } from 'react'
import './menuDroite.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Droite = () => {
    const [visible, setVisible] = useState(false)
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
                            <img src="./bgc.png" alt="" />
                        </div>
                        <span>Jeau Claude</span>
                     </> : ''}
                </div>
            { visible ?
                <div className="m-droite" >
                    
                    <div className="contenu">
                        <div className="img">
                            <div className="cercle">
                                <img src="./bgc.png" alt="" />
                                <div className="infos">
                                    <span>2296</span>
                                    <span>Jean claude</span>
                                    <span>Occupation</span>
                                </div>
                            </div>
                            <span>Bonjour Jean Claude</span>
                        </div>
                        <div className="info">
                            <h2>Informations</h2>
                            <p>IM : RRRRR</p>
                            <p>Nom : Mara Tovoson</p>
                            <p>Fonction : Gestionnaire</p>
                            
                        </div>
                    </div>
                </div>
            : <div className="m-dt">
                <div className="cercle">
                    <img src="./bgc.png" alt="" />
                </div>
              </div>
            }
        </div>
    )
}

export default Droite