var async = require('async');

module.exports = function(app) {

    console.log('here');
    async.series([
        function(callback){
            app.models.user.findOne({
                _id: "5730f6b82eca2a182c717fcb"
            }, function(err, found) {
                if(err || found) return callback(err);

                app.models.user.create({
                    "_id": "5730f6b82eca2a182c717fcb",
                    "password": "$2a$10$zq2QxxlmJW5zK78PWUY4eeZnD1bHDWzZ91QKeO59jGJIDTmE/M/au",
                    "email": "name@example.com"
                }, function(err) {
                    console.log('Created user with email: name@example.com and password: 123456');
                    console.log('Err', err);
                    callback(err);
                });
            });
        },
        function(callback){
            console.log('here 3');
            app.models.RandomModel.create([
                {
                    "_id": "5730fadbc6c720700ecadb30",
                    "name": "Express"
                },
                {
                    "_id": "5730fae1c6c720700ecadb31",
                    "name": "LoopBack"
                }
            ], function(err) {
                callback(err);
            });
        },
        function (callback) {
            console.log('here 4');
            app.models.Role.create([
                {
                    "_id" : "571dd32a8cea6408067e8df3",
                    "name" : "randomModel_findById"
                },
                {
                    "_id" : "571dd3358cea6408067e8df4",
                    "name" : "admin"
                }
            ], function (err) {
                callback(err);
            });
        },
        function (callback) {
            console.log('here 5');
            app.models.RoleMapping.create([
                {
                    "_id" : "571dd99a25dea8502e5aaba4",
                    "principalType" : "ROLE",
                    "principalId" : "571dd3358cea6408067e8df4",
                    "roleId" : "571dd32a8cea6408067e8df3"
                },
                {
                    "_id" : "571ddbe50e0c2a84166d2c79",
                    "principalType" : "USER",
                    "principalId" : "5718bbc2c134dce41909e74b",
                    "roleId" : "571dd3358cea6408067e8df4"
                }
            ], function (err) {
                callback(err);
            });
        }, function (callback) {
            console.log("DB Populated");
            callback();
        }
    ]);
};