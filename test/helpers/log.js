module.exports = (...x) => {
    for(let i = 0; i < x.length; i++) {
        let y = x[i]
        if(Array.isArray(y)) {
            for(let j = 0; j < y.length; j++) {
                console.log(j, y[j].valueOf())
            }
        } else if(typeof y === 'object') {
            console.log(y.valueOf())
        } else {
            console.log(y)
        }
    }
}
