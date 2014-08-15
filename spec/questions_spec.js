/**
 * questions_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/19
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

        frisby.create('Get List of Games')
            .get(apiServerUrl + '/games')
            .expectStatus(200)
            .expectJSONTypes({

            })
            .expectJSON({

            })
            .toss();

        frisby.create('Create Games')
            .put(apiServerUrl + '/games')
            .expectStatus(200)
            .expectJSONTypes({

            })
            .expectJSON({

            })
            .afterJSON(function (game) {
                frisby.create('Get List of Games after Create')
                    .get(apiServerUrl + '/games')
                    .expectStatus(200)
                    .expectJSONTypes({

                    })
                    .expectJSON({

                    })
                    .toss();

                frisby.create('Get the game just created')
                    .get(apiServerUrl + '/game/' + game.data.id)
                    .expectStatus(200)
                    .expectJSONTypes({

                    })
                    .expectJSON({

                    })
                    .toss();

                frisby.create('Update the Game')
                    .post(apiServerUrl + '/game/' + game.data.id)
                    .expectStatus(200)
                    .expectJSONTypes({

                    })
                    .expectJSON({

                    })
                    .toss();
            })
            .toss();
    })
    .toss();
