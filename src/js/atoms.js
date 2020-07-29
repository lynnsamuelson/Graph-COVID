import {
    atom,
} from 'recoil';
import moment from 'moment';
  
export const testAtom = atom({
    key:'atomLs',
    default: 'TESTING123',
})

export const startDateAtom = atom({
    key:'startDateAtom',
    default: moment().subtract(14, 'days')
})

export const endDateAtom = atom({
    key:'endDateAtom',
    default: moment()
})

export const selectedStatesAtom = atom({
    key:'selectedStatesAtom',
    default: ['mn', 'tn']
})

export const graphTypeAtom = atom({
    key:'graphTypeAtom',
    default: ''
})

export const barGraphDataAtom = atom({
    key:'barGraphDataAtom',
    default: []
})

export const graphKeysAtom = atom({
    key:'graphKeysAtom',
    default: ['mn', 'tn']
})