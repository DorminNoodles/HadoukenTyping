
const pushByZIndex = (arr, elem) => {
    let i = 0;
    while (arr.length > i && arr[i].zIndex < elem.zIndex) {
        i++;
    }
    arr.splice(i, 0, elem);
}

export default pushByZIndex;