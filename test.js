const generateLink = (uids) => {
    //var str = "";
    //uids.map(uid => str.concat(uid));
    return uids.join('');
}
console.log(generateLink([1,2,3]));
