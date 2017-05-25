'use strict';

const path = require('path');
const mvc = require('../index.js');

const chai = require('chai');
chai.should();

describe('boot', () => {
    describe('full example', () => {
        beforeEach(() => {
            mvc.boot({
                root : path.join(__dirname, 'scaffold', 'app')
            });
        });
        afterEach(() => {
            mvc.reset();
        });
        it('should load all services synchronously from app/services', () => {
            mvc.services.util.a.should.equal(1);
        });
        it('should wait for app/boot to load', (done) => {
            mvc.promise.then(() => {
                mvc.state.booted.should.equal(true);
                done();
            });
        });

        it('should load models from app/models using boot/models', () => {
            mvc.models.should.deep.equal({
                pages : { name: 'pages', b : 1 },
                users : { name: 'users', c : 1 }
            })
        });
        describe('controllers', () => {
             it('should load basic controllers from app/http/controllers/basic', () => {
                    mvc.controllers.ones.should.deep.equal({
                            d: 1,
                            name: 'ones',
                            singularName: 'one'
                    });
             });
             it('should load resource controllers from app/http/controllers/resource', () => {
                 mvc.controllers.twos.should.deep.equal({
                     e: 1,
                     name: 'twos',
                     singularName: 'two',
                     resource: true
                 });
             });
        });
    });

    describe('minimal example', () => {
        beforeEach(() => {
            mvc.boot({
                root : path.join(__dirname, 'scaffold-minimal'),
                modelLoader : () => {}
            });
        });
        afterEach(() => {
            mvc.reset();
        });
        it('should not error if app/boot is absent', () => {
            mvc.state.booted.should.equal(true);
        });
    });
});
