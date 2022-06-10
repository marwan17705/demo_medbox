general.keyIsValid = function(key,param){
    for(var i=0;i<param.length;i++)
    {
        if(key[param[i]]==param[i])
            return 1;
        else
            return 0;
    }
}




module.exports = general