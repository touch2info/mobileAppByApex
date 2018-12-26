'use strict';
const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({
    'region': 'us-east-1'
});



exports.handler = (event, context, callback) => {

    let type = event.body.type;
    if (type == "CREATE") {

        let body = event.body;
        let id = body.id;
        let creatorid = body.creator.id;
        let creatorname = body.creator.name;
        let priority = body.priority;
        let points = body.points;
        let completionPct = body.completionPct;
        let description = body.description;
        let taskStatus = "open";
        let targetDate = body.targetDate;
        let title = body.title;
        let assignedTo = body.assignedTo;
        let tags = body.tags

        documentClient.put({
            TableName: process.env.TABLE_NAME,
            Item: {
                "id": id,
                "priority": priority,
                "title": title,
                "points": points,
                "completionPct": completionPct,
                "description": description,
                "taskStatus": taskStatus,
                "targetDate": targetDate,
                "creator": { "id": creatorid, "name": creatorname },
                 "assignedTo" : assignedTo,
                "tags": tags
            }
        }, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                callback(null, {
                    statusCode: '500',
                    body: err
                });
            } else {
                callback(null, {
                    statusCode: '200',
                    body: 'Task successfully created. Id is ' + body.id
                });
            }
        })
    }
    else if (type == "UPDATE") {

        let body = event.body;
        let id = body.id;

        if (body.completionPct !== "" && body.completionPct !== undefined) {
            console.log(body.completionPct);
            let completionPct = body.completionPct;


            documentClient.update({
                TableName: process.env.TABLE_NAME,
                Key: { "id": id },
                Item: {
                    "id": id,
                    "completionPct": completionPct
                },
                UpdateExpression: "SET completionPct = :completionPct",
                ExpressionAttributeValues: {
                    ":completionPct": completionPct
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    callback(null, {
                        statusCode: '500',
                        body: err
                    });
                } else {
                    callback(null, {
                        statusCode: '200',
                        body: 'Task updated id ' + body.id
                    });
                }
            })

        }
        if (body.assignedTo != "" && body.assignedTo !== undefined) {
            console.log(body.assignedTo);
            let assignedTo = body.assignedTo;


            documentClient.update({
                TableName: process.env.TABLE_NAME,
                Key: { "id": id },
                Item: {
                    "id": id,
                    "assignedTo": {
                        "id": assignedTo.id,
                        "name": assignedTo.name }
                    },
                    UpdateExpression: "SET assignedTo = :assignedTo",
                    ExpressionAttributeValues: {
                        ":assignedTo": assignedTo
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
                            body: 'Task updated id ' + body.id
                        });
                    }
                })
            
            }
            
            if (body.taskStatus != "" && body.taskStatus !== undefined) {
            console.log(body.taskStatus);
            let taskStatus = body.taskStatus;


            documentClient.update({
                TableName: process.env.TABLE_NAME,
                Key: { "id": id },
                Item: {
                    "id": id,
                    "taskStatus" : taskStatus
                    },
                    UpdateExpression: "SET taskStatus = :taskStatus",
                    ExpressionAttributeValues: {
                        ":taskStatus": taskStatus
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
                            body: 'Task updated id ' + body.id
                        });
                    }
                })
            
            }
            
             if (body.interestedMembers != "" && body.interestedMembers !== undefined) {
            console.log(body.interestedMembers);
            let interestedMembers = body.interestedMembers;


            documentClient.update({
                TableName: process.env.TABLE_NAME,
                Key: { "id": id },
                Item: {
                    "id": id,
                    "interestedMembers" : interestedMembers
                    },
                    UpdateExpression: "SET interestedMembers = :interestedMembers",
                    ExpressionAttributeValues: {
                        ":interestedMembers": interestedMembers
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
                            body: 'Task updated id ' + body.id
                        });
                    }
                })
            
            }
            
            
        }

        else {
            callback(null, {
                statusCode: '200',
                body: event.method + ' was supplied. Expecting POST or PUT'
            });
        }
    };