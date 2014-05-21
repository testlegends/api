/**
 * questions_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/19
 */

var frisby = require('frisby');

frisby.create('OAuth2 login')
    .post('http://localhost:1338/oauth/token', {
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


    })
    .toss();
