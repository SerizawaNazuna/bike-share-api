'use strict';

module.exports.ports = (event, context, callback) => {
  const bikeshareapi = require('./index.js').bikeshareapi;
  var param = JSON.parse(event.body);
  bikeshareapi.sessionInfo.SessionID = null; // FIXME pararell execution problem
  bikeshareapi.sessionInfo.MemberID = param.MemberID;
  bikeshareapi.sessionInfo.Password = param.Password;
  bikeshareapi.listPorts(param.AreaId)
    .then((ports) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!',
          result: ports
        }),
      };

      callback(null, response);
    })
    .catch((error) => {
      callback(error, response);
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.bikes = (event, context, callback) => {
  // TODO remove duplication
  const bikeshareapi = require('./index.js').bikeshareapi;
  var param = JSON.parse(event.body);
  bikeshareapi.sessionInfo.SessionID = null; // FIXME pararell execution problem
  bikeshareapi.sessionInfo.MemberID = param.MemberID;
  bikeshareapi.sessionInfo.Password = param.Password;
  const parkingId = event.pathParameters.ParkingID;
  bikeshareapi.listBikes(parkingId)
    .then((bikes) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          result: bikes
        }),
      };

      callback(null, response);
    })
    .catch((error) => {
      // TODO improve error handling
      callback(error);
    });
};
