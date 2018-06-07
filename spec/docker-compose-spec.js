'use strict';

const path = require('path');
const compose = require('..');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

describe('compose', () => {
    let sut;

    beforeEach(() => {
        sut = compose(path.join(__dirname, 'fixtures', 'example.yaml'));
    });

    describe('when the cluster is up', () => {
        beforeEach((done) => {
            sut.up()
                .then(done)
                .catch(done.fail);
        });

        afterEach((done) => {
            sut.down({
                timeout: 1,
                '--rmi': 'local',
                '--volumes': '',
                '--remove-orphans': ''
            }).then(done).catch(done.fail);
        });

        it('should be able to call start and stop the service', (done) => {
            sut.start('test')
                .then(() => sut.stop('test', {
                    timeout: 5,
                }))
                .then(done)
                .catch(done.fail);
        });

        it('should be able to call start and kill the service', (done) => {
            sut.start('test')
                .then(() => sut.kill('test'))
                .then(done)
                .catch(done.fail);
        });

        it('should be able to be list running services', (done) => {
            sut.start()
                .then(() => sut.ps())
                .then((result) => {
                    expect(result).not.toEqual(null);
                    done();
                }).catch(done.fail);
        });
    });
});
