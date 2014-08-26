/**
 * classes_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/21
 */

var frisby = require('frisby');

var oauthServerUrl = 'https://leejefon.local:1338';
var apiServerUrl = 'https://leejefon.local:1339';

frisby.create('OAuth2 login')
    .post(oauthServerUrl + '/oauth/token', {
        username: 'q@q.cc',
        password: 'fu041u03',
        client_id: '53562b9335e2e5c84c0001fa',
        grant_type: 'password'
    })
    .expectStatus(200)
    .afterJSON(function(response) {
        frisby.globalSetup({ // globalSetup is for ALL requests
            request: {
                headers: { 'Authorization': response.token_type + ' '+ response.access_token }
            }
        });

        frisby.create('Get Classes')
            .get(apiServerUrl + '/games')
            .expectStatus(200)
            .expectJSONLength(2)
            .toss();

        frisby.create('Create Class')
            .toss();

        frisby.create('Add student')
            .toss();

        frisby.create('Add list')
            .toss();
    })
    .toss();
