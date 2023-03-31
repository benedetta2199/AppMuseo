import { create } from 'zustand'
import db from '@database'
import {getDoc, doc, addDoc, updateDoc, collection, arrayUnion, getDocs, increment, serverTimestamp } from "firebase/firestore";
import { format } from 'date-fns'
import { it } from 'date-fns/locale';

const useStore = create((set,get) => ({
  /*CAMPI DI PERCORSO FATTO (compreso id)*/
  user: {},
  allRoute: new Map(),
  allFind: new Map(),
  cronologiaReperti: [],
  percorsiTerminati: [],
  percorsiIncompleti: [],
  /*CAMPI DI PERCORSO FATTO (compreso id) + LISTA REPETI PERCORSO COLLEGATO*/
  currentRoute: {},
  currentIdReperto: '',

                                                                          /*FUNZIONI DI CARICAMENTO GENERALI*/
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

  /**INIZIALIZZA TUTTI I REPERTI OTTENUTI DALL'UTENTE*/
  inizializeCronoReperti: async () => {
    let list = [];
    for (const id of get().user.reperti) {
      const rep = get().allFind.get(id);
      if(!rep.esterno){
        list=list.concat(rep);
      }
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
        const element = {nome: p.nome, img: p.img, punteggio: pf.punteggio, perc: perc, hue: p.colore, ultimoReperto: i, idRoute: pf.nome, idUserRoute: docSnapPF.id};
        incompleti=incompleti.concat(element);
      }
    }
    set({ percorsiTerminati: terminati });
    set({ percorsiIncompleti: incompleti });
  },



                                                                          /*FUNZIONI RELATIVE ALL'UTENTE*/
  inizializeUser: (id, user) => set({ user: Object.assign({id: id}, user) }),
  updatePointUser: async(increse) => {
    /*AGGIORNAMENTO DATI STORE */
    set((state) => ({ user: {...state.user, punteggio: state.user.punteggio+increse} }));
    /*AGGIORNAMENTO DATI DATABASE */
    const ref = doc(db, "user", get().user.id);
    await updateDoc(ref, {punteggio: increment(increse)});
  },
  logOut: () => set({ user: {} }),
  addReperto: async() => {
    const idRep = get().currentIdReperto;
    if(!get().user.reperti.includes(idRep)){
      /**da vedere se fuziona push */
      get().user.reperti.push(idRep);
      const rep = get().allFind.get(idRep);
      if(!rep.esterno){
        set((state) => ({ cronologiaReperti: [...state.cronologiaReperti, rep]}));
      }
    }
    const refUser = doc(db, "user", get().user.id);
    await updateDoc(refUser, {reperti: arrayUnion(idRep)});
  },
  
                                                                          /*FUNZIONI RELATIVE AL PERCORSO*/
  /** AGGIUNGI UN NUOVO PERCORSO FATTO */
  addNewRoute: async (id) => {
    /*AGGIORNAMENTO DATI STORE*/
    /*aggiungi percorso fatto (incompleto)*/
    const p = get().allRoute.get(id);
    const elem = {nome: id, img: p.img, punteggio: 0, perc: 0, hue: p.colore, ultimoReperto: 0, idRoute: id, idUserRoute: idPFatto};
    set((state) => ({ percorsiIncompleti: [...state.percorsiIncompleti, elem]}));
    /*aggingi l'id di percorsoFatto alla lista di percorsi iniziati dall'utente */

    await get().inizializeCurrentRoute(idPFatto, id);
    
    /*AGGIORNAMENTO DATI DATABASE */
    /*aggiungi percorso fatto*/
    const docRef = await addDoc(collection(db, "percorsoFatto"), {data: null, nome: id, punteggio: 0, terminato: false, ultimoReperto: 0});
    /*aggingi l'id di percorsoFatto alla lista di percorsi iniziati dall'utente */
    const idPFatto = docRef.id;
    const refUser = doc(db, "user", get().user.id);
    await updateDoc(refUser, {percorsiFatti: arrayUnion(idPFatto)});
  },
  /**INIZIALIZZA NELLO STORE LA ROUTE CORRENTE  */
  inizializeCurrentRoute: (idPercorsoFatto, idPercorso) => {
    const p = get().allRoute.get(idPercorso);
    const pf = get().percorsiIncompleti.filter(e => e.idUserRoute === idPercorsoFatto)[0];
    /*AGGIORNAMENTO DATI STORE */
    if(Object.keys(get().currentRoute).length == 0){
      const initR = {id: pf.idUserRoute, img: pf.img, nome: idPercorso, hue: pf.hue, punteggio: pf.punteggio, ultimoReperto: pf.ultimoReperto, reperti: p.reperti}
      set({ currentRoute: initR});
      set({ currentIdReperto: initR.reperti[initR.ultimoReperto]});
    }
  },
  /**MODIFICA LA ROUTE CORRENTE AGGIORNANDO IL PUNTEGGIO E L'INDICE  */
  updateCurrentRoute: async (incrementPoint) => {
    /** */
    /*AGGIORNAMENTO DATI STORE */
    const route = get().currentRoute;
    const updateRoute = {...route, ultimoReperto: route.ultimoReperto+1, punteggio: route.punteggio+incrementPoint}
    set({ currentRoute: updateRoute });
    set((state) => ({currentIdReperto: state.currentRoute.reperti[state.currentRoute.ultimoReperto]}));
    set((state) => ({ percorsiIncompleti: state.percorsiIncompleti.filter(e => e.idUserRoute !== route.id)}));
    set((state) => ({ percorsiIncompleti: [...state.percorsiIncompleti, get().currentRoute]}));

    /*AGGIORNAMENTO DATI DATABASE */
    const refRoute = doc(db, "percorsoFatto", get().currentRoute.id);
    await updateDoc(refRoute, {punteggio: increment(incrementPoint),ultimoReperto: increment(1)});
  },
  isLast: () =>{
    const r = get().currentRoute;
    const rep = r.reperti || [];
    const result = (r.ultimoReperto) >=rep.length;
    if(result){
      get().endRoute();
    }
    return result;
  },
  endRoute: async() => {
    const time = serverTimestamp();
    const cRoute = get().currentRoute;
    /*AGGIORNAMENTO DATI STORE */
    const endP = {nome: cRoute.nome, img: cRoute.img, punteggio: cRoute.punteggio, data: time, hue: cRoute.hue }
    set((state) => ({ percorsiTerminati: [...state.percorsiTerminati, endP]}));
    set((state) =>({ percorsiIncompleti: state.percorsiIncompleti.filter(e => e.idUserRoute !== cRoute.id)}));
    set({ currentRoute: {}});

    /*AGGIORNAMENTO DATI DATABASE */
    const refRoute = doc(db, "percorsoFatto", cRoute.id);
    await updateDoc(refRoute, {terminato: true, data: time});
    /*prendi il percorso dal database e aggiungilo allo store*/
  },

  /**RESTITUISCE I DATI DEL REPERTO corrente */
  getReperto: () => { return get().allFind.get(get().currentIdReperto); }}));

export default useStore;