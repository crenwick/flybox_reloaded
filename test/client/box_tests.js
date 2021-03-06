'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Box Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('flyboxApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var boxController = $controllerConstructor('BoxCtrl', {$scope: $scope});
    expect(typeof boxController).toBe('object');
  });

  describe('box functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('BoxCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get a box from the server', function() {
      $httpBackend.expectGET('/api/boxes/undefined').respond(200, {name: 'flyboxman', box: {
        'subject': 'testSubject',
        'date': '1/2/13',
        'members': [],
        'thread': []
      }});
      $httpBackend.flush();
      expect(typeof $scope.box).toBe('object');
      expect($scope.username).toBe('flyboxman');
    });
  });
});