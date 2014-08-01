/**
 * lists_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/07/06
 */

var frisby = require('frisby');

var oauthServerUrl = 'http://localhost:1338';
var apiServerUrl = 'http://localhost:1339';

frisby.create('OAuth2 login')
    .post(oauthServerUrl + '/oauth/token', {
        username: 'q@q.cc',
        password: 'fu041u03',
        client_id: '53562b9335e2e5c84c0001fa',
        grant_type: 'password'
    })
    .expectStatus(200)
    .afterJSON(function (response) {
        frisby.globalSetup({ // globalSetup is for ALL requests
            request: {
                'headers': { 'Authorization': response.token_type + ' '+ response.access_token },
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        frisby.create('Get Lists')
            .get(apiServerUrl + '/lists')
            .expectStatus(200)
            .expectJSONLength('data', 2)
            .toss();

        frisby.create('Create List')
            .put(apiServerUrl + '/lists', {
                title: 'Test List',
                desc: 'Test Description',
                terms: [
                    {
                        term: 'g',
                        definition: 'Gravitational Force'
                    }
                ]
            }, { json: true })
            .expectStatus(200)
            .expectJSON({
                status: 'OK',
                data: {
                    title: 'Test List',
                    desc: 'Test Description',
                    terms: [
                        {
                            term: 'g',
                            definition: 'Gravitational Force'
                        }
                    ]
                }
            })
            .afterJSON(function (response) {
                frisby.create('Update')
                    .post(apiServerUrl + '/list/' + response.data.id, {
                        title: 'Test List Updated',
                        desc: 'Test Description Updated',
                        terms: [
                            {
                                term: 'm',
                                definition: 'meter'
                            }
                        ]
                    }, { json: true })
                    .expectStatus(200)
                    .expectJSON({
                        status: 'OK',
                        data: {
                            id: response.id,
                            title: 'Test List Updated',
                            desc: 'Test Description Updated',
                            terms: [
                                {
                                    term: 'm',
                                    definition: 'meter'
                                }
                            ]
                        }
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
