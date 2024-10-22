import React from 'react'
import './stat.scss'

function Stat({listes}) {
    return (
        <div className="composant1"> 
            { listes.map((liste) =>(

                <div className='Tous' key={liste.id}>
                    <img src={liste.img} alt="" />
                    <div className="texte">
                        <span>{liste.nbr}</span>
                        <span>{liste.texte}</span>
                    </div>
                </div>
                ))
            }
                
            </div>
    )
}

export default Stat
