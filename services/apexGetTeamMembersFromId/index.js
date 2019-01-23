
'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});
 

 
exports.handler = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME,
		Key: { id: event.id}
      // ProjectionExpression: 'phone'
	};
	documentClient.get(params, function(err, data){
		
		if(err){
		    console.log("Error", err);
		   return callback(null,{
            statusCode: 200,
            status: "error",
            msg : "Invalid credentials"
            });
		    
		}else{
		   console.log("Success", data);
		   return callback(null,{
            statusCode: 200,
            status : "success",
            msg: "success",
            user: {"id" : data.Item.id, "name" : data.Item.name}
            });

		}
	});
}
