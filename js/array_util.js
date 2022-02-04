
function JsonUtil()
{
    /**
     * 
     * @param {string} json 
     */
    this.toArray = function(json)
    {
        var tmp = []
        var json_obj = JSON.parse(json)
        for(item in json_obj)
        {
            tmp.push(json_obj[item])
        }
        return tmp
    }
    /**
    * 
    * @param {Array} array 原始数组
    * @param {number} size 数组分割大小
    * @return {Array} result
    */
    this.arraySplit = function array_split(array,size)
    {
        var result_array = []
        for(i=0;i<array.length;i+=10)
        {
            result_array.push(array.slice(i,i+10))
        }
        return result_array
    }
}