module.exports = {
    checkNull:(x) =>{
        if (typeof x === 'undefined' || x === null || x === '') {
            return true;
        }
        else {
            return false
        }
    },
    checkLength:(x, minus, max)=>{
        if ( x.length < minus || x.length > max) return true;
        else return false
    },

};

