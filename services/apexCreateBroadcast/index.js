'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});
 


exports.handler = (event, context, callback) => {
    let body = event.body;
    let id = body.id;
    let message= body.message;
    let title= body.title;
    let startDate= body.startDate;
    let endDate= body.endDate;
    let priority= body.priority;
 
    documentClient.put({
        TableName: process.env.TABLE_NAME,
        Item: {
          "id" : id,
          "message" : message,
          "title" : title,
          "startDate": startDate,
          "endDate" : endDate,
          "priority" : priority
        }
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(null, {
                statusCode: '500',
                body: err
            });
        } else {
            callback(null, {
                statusCode: '200',
                body: 'Created a task with id ' + body.id
            });
        }
    })
};