const Environment = require('./Environment');

const fetch = require('node-fetch');

// Construct google cloud vision request data
function _buildVisionReqBody(base64ImageFile) {
  var requestBody = {};

  requestBody.requests = [];
  var image = {'content':  base64ImageFile };
  var features = [{'type': 'TEXT_DETECTION'}];
  requestBody.requests[0] = {image, features};

  return JSON.stringify(requestBody);
}

function _processResponse(jsonResponse) {
  return jsonResponse.responses[0].textAnnotations[0].description;
}

function makeRequest(base64Image) {
  return fetch('https://vision.googleapis.com/v1/images:annotate?key=' + Environment.key, { method: 'POST', body: _buildVisionReqBody(base64Image) })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return _processResponse(json);
    })
    .catch((error) => {console.log(error)});  
};

module.exports = { makeRequest };
