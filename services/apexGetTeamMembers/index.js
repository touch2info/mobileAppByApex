
'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});
 

 
module.exports.list = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME
		
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    console.log("Error", err);
		    callback(err, "Error!");
		}else{
		    data.Items.forEach(function(element, index, array) {
             console.log(element.name + " - "  + element.location + " - " + element.phone );
             });
             
              callback(null,{
            statusCode: 200,
            headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
            body: {  teamMembers: data.Items
               }
            });

		}
	});
}