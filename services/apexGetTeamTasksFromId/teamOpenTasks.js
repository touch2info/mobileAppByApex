
'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});

let result = "";


module.exports.list = function(event, context) {
	return new Promise((resolve, reject) => {
	if (event.tag !== '' && event.tag !== undefined) {
		resolve(listTagFiltered(event, context));
	}
	else{
	  resolve(listAllOpen(event,context));
	}
	})
}



var listAllOpen =   function (event, context) {
	
	return new Promise((resolve, reject) => {
    	var params = {
		TableName : process.env.TABLE_NAME,
      	FilterExpression: 'taskStatus <> :taskStatus' ,
		ExpressionAttributeValues: {     
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
		   result = {"teamOpenTasks" : data.Items};
		   resolve(result);

		}
		// return result;
	})})};
	
	
 var listTagFiltered =   function (event, context) {
	
	return new Promise((resolve, reject) => {
		let filterTag = event.tag;
		
    	var params = {
		TableName : process.env.TABLE_NAME,
      	FilterExpression: 'taskStatus <> :taskStatus  and contains(tags, :mytag)' ,
		ExpressionAttributeValues: {     
		":taskStatus" : "closed",
		":mytag" : filterTag,
		}
	};
	documentClient.scan(params, function(err, data){
		
		if(err){
		    console.log("Error", err);
		     result = err;
		     return reject(result);
		    
		}else{
		   console.log("Success", data);
		   result = {"teamOpenTasks" : data.Items};
		   resolve(result);

		}
		// return result;
	})});
};