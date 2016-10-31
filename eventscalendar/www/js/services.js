angular.module('starter.services', ['ngResource'])

.factory('Event', function ($resource) {
    return $resource('http://localhost:5000/events/:eventId');
})

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
});