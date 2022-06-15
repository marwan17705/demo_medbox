module.exports = 
{
    info_400_type :
    {
    "info" : "Bad request, type's incorrect. ",
    "http" : 400,
    "status":false
    },
    info_400_null :
    {
    "info" : "Bad request, some parameter's null. ",
    "http" : 400,
    "status":false
    },
    info_200_insert : {
    "info" : "OK, it's inserted successfully.",
    "http" : 200,
    "status":true
    },
    info_200_no_insert : {
    "info" : "Fail , it'sn't inserted.",
    "http" : 200,
    "status":false
    },
    info_200_update : {
    "info" : "success, data is updated successfully.",
    "http" : 200,
    "status":true
    },
    info_200_no_update : {
    "info" : "Fail , Fail, data cannot update",
    "http" : 200,
    "status":false
    },
    info_200_not_found : {
    "info" : "Not Success, data isn't found with this query.",
    "http" : 200,
    "status":false
    },
    info_200_found : {
    "info" : "Success , data is found with this query.",
    "http" : 200,
    "status":true
    },
    info_200_delete : {
    "info" : "Success , data is found with this query.",
    "http" : 200,
    "status":true
    },
    info_403 : {
    "info" : "cannot access the requested resource.",
    "http" : 403
    }
    
}
