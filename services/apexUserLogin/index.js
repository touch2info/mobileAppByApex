'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});
 



exports.handler = (event, context, callback) => {

    let method = event.method;
    if (method == "POST") {

        let body = event.body;
        let userid = body.userid;
        let password = body.password;
        
        var params = {
		TableName : process.env.TABLE_NAME,
	    FilterExpression: 'userid = :userid and password = :password' ,
		ExpressionAttributeValues: {     
		":userid" : userid,
		":password" : password
		}
    	};
    	
    	documentClient.scan(params, function(err, data){
        if(err){
		    console.log("Error", err);
		   return callback(null,{
            statusCode: 200,
            status: "error",
            msg : "Invalid credentials"
            });
		    
		}else{
		   console.log("Success", data);
		   if (data.Items.length > 0){
		   return callback(null,{
            statusCode: 200,
            status : "success",
            msg: "success",
            user: {"id" : data.Items[0].id, "name" : data.Items[0].name}
            });
		   }
		   else{
		        return callback(null,{
            statusCode: 200,
            status: "error",
            msg : "Invalid credentials"
            });
		   }

		}
	});
	
	
	
    }
}
