import { create } from 'zustand'
import db from '@database'
import {getDoc, doc, collection, getDocs } from "firebase/firestore";
import { format } from 'date-fns'
import { it } from 'date-fns/locale';

const useStore = create((set,get) => ({
  user: {},
  allRoute: new Map(),
  allFind: new Map(),
  cronologiaReperti: [],
  percorsiTerminati: [],
  percorsiIncompleti: [],
  /*CAMPI DI PERCORSO FATTO (compreso id) + LISTA REPRTI PERCORSO COLLEGATO*/
  currentRoute: {},
  indexCurrentRoute: null,

  /**CARICA TUTTI I REPERTI NELLA MAPPA allFind */
  loadFind: async () => {
    const querySnapshot = await getDocs(collection(db, "reperto"));
    querySnapshot.forEach((doc) => {
      get().allFind.set(doc.id,  doc.data()); 
    });
  },
  /**CARICA TUTTI I PERCORSI NELLA MAPPA allRoute */
  loadRoute: async () => {
    const querySnapshot = await getDocs(collection(db, "percorso"));
    querySnapshot.forEach((doc) => {
      get().allRoute.set(doc.id,  doc.data()); 
    });
  },

  inizializeUser: (user) => set({ user: user }),
  updatePoint: (increse) => set((state) => ({ user: state.user.point + increse })),
  logOut: () => set({ user: {} }),

  /**INIZIALIZZA TUTTI I REPERTI OTTENUTI DALL'UTENTE*/
  inizializeCronoReperti: async () => {
    let list = [];
    for (const rep of get().user.reperti) {
      list=list.concat(get().allFind.get(rep));
    }
    set({ cronologiaReperti: list });
  },
  /**INIZIALIZZA TUTTI I PERCORSI, DIVIDENDOLI IN CONCLUSI E NON, INTRAPRESI DALL'UTENTE*/
  inizializePercorsiFatti: async () => {
    let terminati = [], incompleti = [];
    for (const route of get().user.percorsiFatti) {
      const docRefPF = doc(db, "percorsoFatto", route);
      const docSnapPF = await getDoc(docRefPF);
      const pf = docSnapPF.data();
      const p = get().allRoute.get(pf.nome);
      if(pf.terminato){
        const element = {nome: p.nome, img: p.img, punteggio: pf.punteggio, data: format(pf.data.toDate(),'d MMMM yyyy', {locale: it}), hue: p.colore}
        terminati=terminati.concat(element);
      } else {
        const i =  pf.ultimoReperto;
        const nRep = p.reperti.length
        const perc = (i)*100/nRep;
        const element = {nome: p.nome, img: p.img, punteggio: pf.punteggio, perc: perc, hue: p.colore, index: i, leng: nRep, 
          idRoute: docSnapP.id, idUserRoute: docSnapPF.id, next:p.reperti[i]};
        incompleti=incompleti.concat(element);
      }
    }
    set({ percorsiTerminati: terminati });
    set({ percorsiIncompleti: incompleti });
  },

  getCurrentReperto: () => {
    const i = get().currentRoute.ultimoReperto;
    const idReperto = get().currentRoute.reperti[i];
    return get().allFind.get(get)
  },


}));

export default useStore;