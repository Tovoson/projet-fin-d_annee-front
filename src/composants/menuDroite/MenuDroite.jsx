import React from 'react'
import './menuDroite.scss'

const Droite = () => {
    return (
        <div className="m-droite">
            <div className="avatar">
                <div className="cercle">
                    <img src="./bgc.png" alt="" />
                </div>
                <span>Jeau Claude</span>
            </div>
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
    )
}

export default Droite