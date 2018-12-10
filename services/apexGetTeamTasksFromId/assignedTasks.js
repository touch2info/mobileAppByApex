
// 'use strict';
// const AWS = require('aws-sdk');
// let documentClient = new AWS.DynamoDB.DocumentClient({
//     'region': 'us-east-1'
// });

// let result = "";
// module.exports = {

// 	list :  function (event, context, callback) {
//     	var params = {
// 		TableName : process.env.TABLE_NAME,
//       	FilterExpression: 'assignedTo.id = :assignedToId' ,
// 		ExpressionAttributeValues: {     
// 		":assignedToId" : event.id
// 		}
// 	};
// 	documentClient.scan(params, function(err, data){
		
// 		if(err){
// 		    console.log("Error", err);
// 		     result = err;
		    
// 		}else{
// 		   console.log("Success", data);
// 		   result = data;

// 		}
// 		 callback(result);
// 	});
	
// }
// };