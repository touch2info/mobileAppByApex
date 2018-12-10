
'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});

let result = "";
module. exports.list =   function (event, context) {
	
	return new Promise((resolve, reject) => {
    	var params = {
		TableName : process.env.TABLE_NAME,
      	FilterExpression: 'creator.id = :id and taskStatus <> :taskStatus' ,
		ExpressionAttributeValues: {     
		":id" : event.id,
		":taskStatus" : "closed"
		}
	};
	documentClient.scan(params, function(err, data){
		
		if(err){
		    console.log("Error", err);
		     result = err;
		     return reject(result);
		    
		}else{
		   console.log("Success", data);
		   result = {"myCreatedTasks" : data.Items};
		   resolve(result);

		}
	})});
};