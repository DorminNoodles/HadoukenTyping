import pushByZIndex from '../helpers/pushByZIndex';
import { emit } from 'nodemon';

let objArr = [
    {
        id: 1,
        zIndex: 1
    },
    {
        id: 2,
        zIndex: 4
    },
    {
        id: 3,
        zIndex: 6
    }
];

const newObject1 = {
    id: 32,
    zIndex: 3
}

const newObject2 = {
    id: 33,
    zIndex: 2
}

const newObject3 = {
    id: 34,
    zIndex: 7
}

const newObject4 = {
    id: 35,
    zIndex: 7
}

const newObject5 = {
    id: 36,
    zIndex: 5
}

pushByZIndex(objArr, newObject1);
pushByZIndex(objArr, newObject2);
pushByZIndex(objArr, newObject3);
pushByZIndex(objArr, newObject4);
pushByZIndex(objArr, newObject5);


const exemple = [ { id: 1, zIndex: 1 },
    { id: 33, zIndex: 2 },
    { id: 32, zIndex: 3 },
    { id: 2, zIndex: 4 },
    { id: 36, zIndex: 5 },
    { id: 3, zIndex: 6 },
    { id: 35, zIndex: 7 },
    { id: 34, zIndex: 7 } ];

objArr.forEach((elem, index) => {

    if (elem.zIndex == exemple[index].zIndex)
        console.log("Valid ", index);
    else
        console.log("Error attempt ", exemple[index].zIndex, " find ", elem.zIndex);
});