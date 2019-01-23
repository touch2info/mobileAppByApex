var assignedTasks = require('./myAssignedTasks');
var teamOpenTasks = require('./teamOpenTasks');
var myCreatedTasks = require('./myCreatedTasks');
var finalResponseJSON = "";



exports.handler = function (event, context, callback) {

    var promise1 = teamOpenTasks.list(event, context)
        .then(function (response) {
            return response;
        }, function (err) {
            console.log(err);
        });
        
    var promise2 = myCreatedTasks.list(event, context)
        .then(function (response) {
            finalResponseJSON += response;
            return response;
        }, function (err) {
            console.log(err);
        });
        
    var promise3 = assignedTasks.list(event, context)
        .then(function (response) {
             finalResponseJSON += ",";
            finalResponseJSON += response;
            return response;
        }, function (err) {
            console.log(err);
        });
        
        
        
        
        var sendResult = (result) => {
                        callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                },
                body: { "teamTasks": result }
            }
            )};

        
        Promise.all([promise1, promise2, promise3]).then(sendResult);


};