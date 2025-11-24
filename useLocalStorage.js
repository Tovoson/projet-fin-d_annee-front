// import {useEffect, useState} from 'react'

// function getStorageValue(key, defaultValue){

//     if (typeof window !== 'undefined'){

//         const saved = localStorage.getItem(key)
//         const init = saved !== null ? JSON.parse(saved) : defaultValue

//         return init
//     }
// }

// export const useLocalStorage = (key, defaultValue) =>{
//     const [value, setValue] = useState(() => {
//         return getStorageValue(key, defaultValue)
//     });

//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(value))
//     },[key, value])

//     return [value, setValue]
// }

import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    // console.log(`Valeur récupérée pour ${key}:`, saved); // Debug

    if (saved === null) {
      console.log(
        `Aucune valeur trouvée, utilisation de la valeur par défaut:`,
        defaultValue
      );
      return defaultValue;
    }

    try {
      const parsedValue = JSON.parse(saved);
      // console.log(`Valeur parsée:`, parsedValue);
      return parsedValue;
    } catch (e) {
      console.error(`Erreur de parsing pour ${key}:`, e);
      return defaultValue;
    }
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  // Décommentez cet useEffect si vous voulez sauvegarder les changements
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(`Sauvegarde de ${key}:`, value);
      localStorage.setItem(key, JSON.stringify(value));

      // Vérification immédiate de la sauvegarde
      // const savedValue = localStorage.getItem(key);
      // console.log(`Valeur sauvegardée vérifiée:`, savedValue);
    }
  }, [key, value]);

  // Ajout d'un log pour suivre les changements de valeur
  useEffect(() => {
    console.log(`Valeur actuelle de ${key}:`, value);
  }, [value, key]);

  return [value, setValue];
};
