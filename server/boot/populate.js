var async = require('async');
var fs = require('fs');

module.exports = function (app) {

    var dataBasepath = './server/boot/populate-data/';

    var userData = JSON.parse(fs.readFileSync(dataBasepath + 'user-data.json', 'utf8'));
    var randomModelData = JSON.parse(fs.readFileSync(dataBasepath + 'random-model-data.json', 'utf8'));
    var rolesData = JSON.parse(fs.readFileSync(dataBasepath + 'roles-data.json', 'utf8'));
    var roleMappingData = JSON.parse(fs.readFileSync(dataBasepath + 'role-mapping-data.json', 'utf8'));

    async.series([
        function (callback) {
            app.models.user.findOne({
                _id: "5730f6b82eca2a182c717fcb"
            }, function (err, found) {
                if (err || found) return callback(err);

                app.models.user.upsert(userData, function (err) {
                    console.log('Created user with email: name@example.com and password: 123456');
                    callback(err);
                });
            });
        },
        function (callback) {
            async.each(randomModelData, function (model, callback) {
                app.models.RandomModel.upsert(model, function (err) {
                    callback(err);
                });
            }, function (err) {
                callback(err);
            })
        },
        function (callback) {
            async.each(rolesData, function (role, callback) {
                app.models.Role.upsert(role, function (err) {
                    callback(err);
                });
            }, function (err) {
                callback(err);
            });
        },
        function (callback) {
            async.each(roleMappingData, function (mapping, callback) {
                app.models.RoleMapping.upsert(roleMappingData, function (err) {
                    callback(err);
                });
            }, function (err) {
                callback(err);
            });
        }, function (callback) {
            // Checking if user has the roles
            app.models.Role.getRoles({
                    principalType: app.models.RoleMapping.USER,
                    principalId: '5730f6b82eca2a182c717fcb'
                },
                function (err, roles) {
                    console.log('Roles', roles);  // everyone, authenticated, etc (hopefully)
                    callback(err);
                });
        }, function (callback) {
            console.log('DB Populated');
            callback();
        }
    ]);
};