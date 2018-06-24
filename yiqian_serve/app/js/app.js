
'use strict';

var phonecatApp = angular.module('app', ['ngRoute', 'ngGrid', 'ui.bootstrap'])
.config(['$routeProvider', '$locationProvider', '$sceProvider',
    function($routeProvider, $locationProvider, $sceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/login.html',
            controller: 'LoginCtrl'
        }).when('/', {
            templateUrl: '/templates/welcome.html',
            controller: 'WelComeCtrl'
        }).when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        }).when('/user', {
            templateUrl: '/templates/user/user.html',
            controller: 'UserCtrl'
        }).when('/role', {
            templateUrl: '/templates/role/role.html',
            controller: 'RoleCtrl'
        }).when('/permission', {
            templateUrl: '/templates/permission/permission.html',
            controller: 'PermissionCtrl'
        }).when('/sign', {
            templateUrl: '/templates/sign/sign.html',
            controller: 'SignCtrl'
        }).when('/state', {
            templateUrl: '/templates/state/state.html',
            controller: 'StateCtrl'
        }).when('/category', {
            templateUrl: '/templates/category/category.html',
            controller: 'CategoryCtrl'
        }).when('/permidic', {
            templateUrl: '/templates/permidic/permidic.html',
            controller: 'PermidicCtrl'
        }).when('/school', {
            templateUrl: '/templates/school/school.html',
            controller: 'SchoolCtrl'
        }).when('/course', {
            templateUrl: '/templates/course/course.html',
            controller: 'CourseCtrl'
        }).when('/classroom', {
            templateUrl: '/templates/classroom/classroom.html',
            controller: 'ClassroomCtrl'
        }).when('/date', {
            templateUrl: '/templates/date/date.html',
            controller: 'ClassDateCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
    }
])
.factory('flag', function() {
    return false;
})
.controller('NavBarController', function($scope, $http){

    //退出按钮
    $scope.logout = function(){
        console.log("退出");
        $http({
            method: 'POST',
            url: '/action/logout'
        }).success(function(results) {
            console.log(results);
            window.location.reload();
        });
    }

})
    .controller('MenuTreeCtrl', function($scope, $http, $compile){

    //加载菜单树
    console.log("加载菜单树");
    $http({
        method: 'POST',
        url: '/action/menu/queryByUserId',
        data: {
            userId: window.userId
        }
    }).success(function(results) {
        var html = getMenuTreeHtml(results, 0);
        var template = angular.element(html);
        var element = $compile(template)($scope);
        angular.element(".sidebar-menu").append(element);
        $(".sidebar-menu li").each(function(){
             $(this).click(function(){
                 $(this).next().toggle() ;
             }) ;
        });
    });

    //转换html
    var getMenuTreeHtml = function(jsons, parentId){
         var ul = "";
        if(parentId == 0){
            ul = "<ul class='nav' ></ul>" ;
        }else{
            ul = "<ul class='nav' style='display: none;'></ul>" ;
        }
        for(var i = 0; i < jsons.length; i++){
            if(jsons[i].parentId == parentId){
                ul += "<li><a href='" + jsons[i].path + "' ><i class='fa " + jsons[i].menuIcon + "'></i><span>" + jsons[i].menuName + "</span></a></li>" ;
                ul += getMenuTreeHtml(jsons, jsons[i].menuId) ;
            }
        }
        ul += "</ul>" ;
        return ul;
    };
}).controller('WelComeCtrl', function($scope) {
    console.log("加载首页...");
}).controller('AboutCtrl', function($scope) {
    console.log("加载关于...");
});



phonecatApp.constant('constantIP', '119.23.39.86');    //方法3定义全局变量 