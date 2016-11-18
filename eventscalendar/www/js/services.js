angular.module('starter.services', ['ngResource'])

.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.factory('Event', function ($resource) {
    return $resource('http://localhost:5000/events/:eventId');
})

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})

.factory('News', function ($resource) {
    return $resource('http://localhost:5000/news/:newsarticleId');
});