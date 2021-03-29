const supertest = require('supertest');
const host = 'http://localhost:8080/';
const request = supertest(host);

let token;
beforeAll((done) => {
    request
        .post('api/signin')
        .send({
            email: '',
            password: ''
        })
        .end((err, response) => {
            if(err) throw err;
            token = response.body.token;
            console.log(token);
            done();
        });
});

describe('Authenticating Users ~ Login', () => {
    test('Logged In Users should have a token', () => {
        return request.get('api/').then((response) => {
            expect(response.body.token).not.toBe(null);
        })
    });
});


describe('Dashboard Home Page', () => {
    it('This should return user profile', async () => {
        return await request
            .get('api/')
            .set('token', token)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body.first_name).not.toBe(null);
                expect(response.body.last_name).not.toBe(null);
            });

    }, 300000);
});

