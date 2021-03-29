const supertest = require('supertest');
const host = 'http://localhost:8080/';
const request = supertest(host);



describe('Registration Page', () => {
    it('This should register users', async () => {
        const response =  await request
            .post('api/signup')
            .send({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: ''
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
            });

    }, 300000);
});

