'use strict';

const path = require('path');
const compose = require('..');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

describe('compose', () => {
    let sut;

    beforeEach(() => {
        sut = compose(path.join(__dirname, 'fixtures', 'example.yaml'));
    });

    describe('->up', () => {
        afterEach(() => sut.down());

        it('should be able to call compose.up()', (done) => {
            sut.up().then(done).catch(done.fail);
        });
    });

    describe('when the cluster is up', () => {
        beforeEach(() => sut.up());

        afterEach(() => sut.down());

        it('should be able to call compose.start()', (done) => {
            sut.start('test').then(done).catch(done.fail);
        });

        it('should be able to call compose.kill()', (done) => {
            sut.kill('test').then(done).catch(done.fail);
        });

        it('should be able to call compose.ps()', (done) => {
            sut.ps().then((result) => {
                expect(result).not.toEqual(null);
                done();
            }).catch(done.fail);
        });
    });
});
