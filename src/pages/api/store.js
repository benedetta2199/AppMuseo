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
  last: false,

  restore:(user, currentRoute, id)=>{
    console.log(get().user);
    const test = get().check();
    console.log(test)
    if(test){
      console.log('start');
      set({ user: user });
      console.log(get().user);
      set({ currentRoute: currentRoute });
      console.log(get().currentRoute);
      set({ idReperto: id });
      console.log(get().currentIdReperto);
      if((currentRoute.ultimoReperto+1) >= currentRoute.reperti.length){
        set({ last: true });
        console.log(get().last);
      }
      get().loadFind();
      console.log('1');
      get().loadRoute();
      console.log('2');
      get().inizializeCronoReperti();
      console.log('3');
      get().inizializePercorsiFatti();
      console.log('4');
    }
  },

                                                                          /*CHECK INIZIALISATION*/
  check: () =>{
    return typeof user === 'undefined';
  },


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
    if(get().cronologiaReperti.length === 0){
      let list = [];
      for (const id of get().user.reperti) {
        const rep = get().allFind.get(id);
        if(!rep.esterno){
          list=list.concat(rep);
        }
      }
      set({ cronologiaReperti: list });
    }
  },

  /**INIZIALIZZA TUTTI I PERCORSI, DIVIDENDOLI IN CONCLUSI E NON, INTRAPRESI DALL'UTENTE*/
  inizializePercorsiFatti: async () => {
    if(get().percorsiIncompleti.length === 0 && get().percorsiTerminati.length === 0){
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
          const element = {nome: p.nome, img: p.img, punteggio: pf.punteggio, perc: perc, hue: p.colore, ultimoReperto: i, idRoute: pf.nome, id: docSnapPF.id};
          incompleti=incompleti.concat(element);
        }
      }
      set({ percorsiTerminati: terminati });
      set({ percorsiIncompleti: incompleti });
    }
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
  addReperto: async(idRep) => {
    if(!get().user.reperti.includes(idRep)){
      /**da vedere se fuziona push */
      get().user.reperti.push(idRep);
      const rep = get().allFind.get(idRep);
      if(rep !== undefined){
        if(!rep.esterno){
          /*AGGIORNAMENTO DATI STORE */
          set((state) => ({ cronologiaReperti: [...state.cronologiaReperti, rep]}));
          
          /*AGGIORNAMENTO DATI DATABASE */
          const refUser = doc(db, "user", get().user.id);
          await updateDoc(refUser, {reperti: arrayUnion(idRep)});
        } 
      }
    }
  },
  
                                                                          /*FUNZIONI RELATIVE AL PERCORSO*/
  /** AGGIUNGI UN NUOVO PERCORSO FATTO */
  addNewRoute: async (id) => {    
    /*AGGIORNAMENTO DATI DATABASE */
    /*aggiungi percorso fatto*/
    const docRef = await addDoc(collection(db, "percorsoFatto"), {data: null, nome: id, punteggio: 0, terminato: false, ultimoReperto: 0});
    /*aggingi l'id di percorsoFatto alla lista di percorsi iniziati dall'utente */
    const idPFatto = docRef.id;
    const refUser = doc(db, "user", get().user.id);
    await updateDoc(refUser, {percorsiFatti: arrayUnion(idPFatto)});

    /*AGGIORNAMENTO DATI STORE*/
    /*aggiungi percorso fatto (incompleto)*/
    const p = get().allRoute.get(id);
    const elem = {nome: p.nome, img: p.img, punteggio: 0, perc: 0, hue: p.colore, ultimoReperto: 0, idRoute: id, id: idPFatto};

    set((state) => ({ percorsiIncompleti: [...state.percorsiIncompleti, elem]}));
    /*aggingi l'id di percorsoFatto alla lista di percorsi iniziati dall'utente */

    await get().inizializeCurrentRoute(idPFatto, id);
  },

  /**INIZIALIZZA NELLO STORE LA ROUTE CORRENTE  */
  inizializeCurrentRoute: (idPercorsoFatto, idPercorso) => {
    set({ last: false });
    const p = get().allRoute.get(idPercorso);
    const pf = get().percorsiIncompleti.filter(e => e.id === idPercorsoFatto)[0];
    /*AGGIORNAMENTO DATI STORE */
    if(Object.keys(get().currentRoute).length == 0){
      const initR = {id: pf.id, img: pf.img, idRoute: idPercorso, nome: p.nome, hue: pf.hue, punteggio: pf.punteggio, ultimoReperto: pf.ultimoReperto, reperti: p.reperti}
      set({ currentRoute: initR});
      set({ currentIdReperto: initR.reperti[initR.ultimoReperto]});
    }
  },
  /**INIZIALIZZA NELLO STORE LA ROUTE CORRENTE  */
  resetCurrentRoute: () => {
    set({ currentRoute: {}});
  },
  /**MODIFICA LA ROUTE CORRENTE AGGIORNANDO IL PUNTEGGIO E L'INDICE (agginugi reperto alla cronologia e controlla se è l'ultimo)  */
  updateCurrentRoute: async (incrementPoint) => { 
    get().addReperto(get().currentIdReperto);  
    const route = get().currentRoute;

    /*AGGIORNAMENTO DATI DATABASE */
    const refRoute = doc(db, "percorsoFatto", route.id);
    await updateDoc(refRoute, {punteggio: increment(incrementPoint),ultimoReperto: increment(1)});
  },
  nextReperto: (incrementPoint) => {
    get().nextIsLast();
     /*AGGIORNAMENTO DATI STORE */
     const route = get().currentRoute;
     const ultimoRep = route.ultimoReperto+1;
     const nRep = route.reperti.length;
     set({currentIdReperto: route.reperti[ultimoRep]});
     const updateRoute = {...route, punteggio: route.punteggio+incrementPoint, ultimoReperto: ultimoRep, perc: ultimoRep*100/nRep}
     set({ currentRoute: updateRoute });
     const updateRouteIndex = {...route, ultimoReperto: route.ultimoReperto+1}
     set((state) => ({ percorsiIncompleti: state.percorsiIncompleti.filter(e => e.id !== route.id)}));
     set((state) => ({ percorsiIncompleti: [...state.percorsiIncompleti, updateRouteIndex]}));
    
  },
  termina: ()=>{
    const r = get().currentRoute;
    const rep = r.reperti || [];
    return (r.ultimoReperto+1) >= rep.length;
  },
  nextIsLast: () =>{
    const r = get().currentRoute;
    const rep = r.reperti || [];
    if((r.ultimoReperto+1) >= rep.length){
      set({ last: true });
      get().endRoute();
    }
  },
  endRoute: async() => {
    const time = serverTimestamp();
    const cRoute = get().currentRoute;

    /*AGGIORNAMENTO DATI DATABASE */
    const refRoute = doc(db, "percorsoFatto", cRoute.id);
    await updateDoc(refRoute, {terminato: true, data: time});
    /*prendi il percorso dal database e aggiungilo allo store*/

    /*AGGIORNAMENTO DATI STORE */
    const endP = {nome: cRoute.nome, img: cRoute.img, punteggio: cRoute.punteggio, data: time, hue: cRoute.hue }
    set((state) => ({ percorsiTerminati: [...state.percorsiTerminati, endP]}));
    set((state) =>({ percorsiIncompleti: state.percorsiIncompleti.filter(e => e.id !== cRoute.id)}));
    set({ currentIdReperto: ''});
  },

  /**RESTITUISCE I DATI DEL REPERTO corrente */
  getReperto: () => { 
    return get().allFind.get(get().currentIdReperto); 
  },

}));

export default useStore;