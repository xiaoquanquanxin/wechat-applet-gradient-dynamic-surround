//  获取背景index
const getBackgroundIndex = (current: number, turn: boolean, overHalf: boolean, startChange: boolean, stopChange: boolean, list: Array<any>): number => {
    let index: number = current;
    //  向右
    if (turn) {
        //  超过一半
        if (overHalf) {
            index = current + 1;
        }
    } else {
        //  超过一半
        if (overHalf) {
            index = current - 1
        }
    }
    //  已经开始改变了
    if (startChange) {
        index = current;
    }
    //  结束滚动了
    if (stopChange) {
        index = current;
    }
    index = Math.min(index, list.length - 1);
    index = Math.max(0, index);
    return index
}


export {
    getBackgroundIndex
}

//  获取背景index

const getBackgroundNextIndex = (current: number, turn: boolean, overHalf: boolean, startChange: boolean, stopChange: boolean, list: Array<any>): number => {
    let index: number = current;
    //  向右
    if (turn) {
        index = current + 1;
        //  超过一半
        if (overHalf) {
            index = current + 1
        }
        //  已经开始改变了
        if (startChange) {
            index = current;
        }
        //  结束了
        if (stopChange) {
            index = current
        }
    } else {
        index = current - 1;
        //  超过一半
        if (overHalf) {
            index = current - 1
        }
        //  已经开始改变了
        if (startChange) {
            index = current
        }
        //  结束了
        if (stopChange) {
            index = current
        }
    }
    index = Math.min(index, list.length - 1);
    index = Math.max(0, index);
    return index
}

export {
    getBackgroundNextIndex
}