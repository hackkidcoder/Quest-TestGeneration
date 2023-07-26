function initCOunt(){
    var count=0;
    function countDown(){
        count++;
        return count;
    }
    return countDown;
}