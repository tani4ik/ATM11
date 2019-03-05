const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getUsers = require('../data/getUsers');
const env = require('../endpoint/test');

describe('Get Users', () => {

    getUsers.map((data) => {
        let response;

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it('Verifying Status Code', () => {
            expect(response.statusCode).to.equal(200);
        });

        it('Verifying Content-type exists', () => {
            expect(response.headers['content-type']).to.not.undefined;
        });

        it('Verifying Content-type equals application/json; charset=utf-8', () => {
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
        });

        it('Verifying number of users is equal to 10', () => {
            expect(response.body).to.be.an('array').that.has.lengthOf(10);
        });
    })

});