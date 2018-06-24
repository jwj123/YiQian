
'use strict';
/**
 * 菜单控制
 * @param {[type]} $scope [description]
 * @param {[type]} $http  [description]
 * @param {[type]} $modal [description]
 */

function CourseCtrl ($scope, $http, $modal,constantIP){
    console.log("加载课程管理..."+constantIP);

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        $http({
            method: 'POST',
            url: 'http://'+constantIP+':8080/ssh/courseaction/getAllCourseHql'
        }).success(function(largeLoad) {
            var obj = $scope.gridOptions.selectedItems;
            obj.splice(0,obj.length);
            $scope.setPagingData(largeLoad.courses, page, pageSize);
        });
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        i18n:'zh-cn',
        enablePaging: true,
        showFooter: true,
        showSelectionCheckbox: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: [],
        columnDefs: [
            {field:'courseName', displayName:'课程名'},
            {field:'ID', displayName:'账号'},
            {field:'dailyWeight', displayName:'日常比重'},
            {field:'finalWeight', displayName:'期末比重'},
            {field:'picketLine', displayName:'旷课警戒数'},
            {field:'classSession', displayName:'课时节次'},
            {field:'classLocation', displayName:'课程地点'},
            {field:'classDate', displayName:'课时周序'},
            {field:'classOrder', displayName:'课时学时'},
            {field:'shape', displayName:'班级布局'}
        ]
    };

    //新增
    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/course/courseModel.html",
            controller: 'CourseInsertCtrl',
            resolve: {
                grid: function(){ return $scope; }
            }
        });
    };

    //更新
    $scope.update = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert("请选择一条记录");
            return;
        }
        $modal.open({
            templateUrl: "/templates/course/courseModel.html",
            controller: 'CourseUpdateCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

    //删除
    $scope.delete = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length == 0){
            alert("请至少选择一条记录");
            return;
        }
        if(!confirm("删除是不可恢复的，你确认要删除吗？")){
            return;
        }
        var selectedItems = $scope.gridOptions.selectedItems;
        var ids = [];

        //var strJson="{";

        for(var i = 0; i < selectedItems.length; i++){
            ids.push(selectedItems[i]["ID"]);
        }
        var json = {};
        for(var i1=0;i1<ids.length;i1++)
        {
            json[i1]=ids[i1];
        }
        JSON.stringify(json);
        $http({
            method: 'POST',
            url: 'http://'+constantIP+':8080/ssh/courseAction/deleteCourseByName',
            params: {
                "id": json
            }
        }).then(function(results){
            //刷新列表
        }).then(function (response) {
            var grid = $scope;
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
        });
    };
}


function CourseInsertCtrl($scope, $modalInstance, $http, grid,constantIP){

    $scope.courses={
    };

    $scope.ok = function () {
        $http({
            method: 'POST',/*-GET--*/
            url: 'http://'+constantIP+':8080/ssh/courseAction/createCourse',
            data:{
                "coursename": $scope.courses.courseName,
                "id": $scope.courses.ID,
                "dailyweight": $scope.courses.dailyWeight,
                "finalweight": $scope.courses.finalWeight,
                "picketline":$scope.courses.picketLine,
                "classsession":$scope.courses.classSession,
                "classlocation": $scope.courses.classLocation,
                "classdate": $scope.courses.classDate,
                "classorder":$scope.courses.classOrder,
                "shape":$scope.courses.shape
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(results){
            //刷新列表
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
            $modalInstance.close();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


function CourseUpdateCtrl($scope, $modalInstance, $http, grid,$log,constantIP){
    console.log("iiiiiiiiiiiiiiiiiiiiii");
    var oldcoursename = "";
    $http({
        method: 'GET',
        url: 'http://'+constantIP+':8080/shhTest/courseaction/getCourseByName',
        params: {"coursename": grid.gridOptions.selectedItems[0].courseName}
    }).success(function(results){
        $log.log(results.course);
        oldcoursename = results.course.courseName;
        $scope.courses = {};
        for(var key in results.course){
            $scope.courses[key] = results.course[key];
        }

    });
    $scope.largeLoads={
    };
    $scope.countries = new Array();
    // $scope.countries[]={};

    $http({
        method: 'POST',
        url: 'http://'+constantIP+':8080/ssh/ddClassDateaction/getAllDdClassDate'
    }).success(function(largeLoad) {
        $scope.largeLoads=largeLoad;
        console.log(largeLoad);
        console.log( $scope.largeLoads.ddClassDates.length);
        console.log(largeLoad.ddClassDates[1].dname);
        console.log($scope.largeLoads.ddClassDates);
        for(var i=0;i<$scope.largeLoads.ddClassDates.length;i++){
            $scope.countries[i]={"dname":$scope.largeLoads.ddClassDates[i].dname,
                "classDate":$scope.largeLoads.ddClassDates[i].classDate};

        }

    });

    $scope.ok = function () {
        $http({
            method: 'POST',
            url: 'http://'+constantIP+':8080/ssh/courseaction/updateCourse',
            data: {
                "oldcoursename":oldcoursename,
                "coursename": $scope.courses.courseName,
                "id": $scope.courses.ID,
                "dailyweight": $scope.courses.dailyWeight,
                "finalweight": $scope.courses.finalWeight,
                "picketline":$scope.courses.picketLine,
                "classsession":$scope.courses.classSession,
                "classlocation": $scope.courses.classLocation,
                "classdate": $scope.courses.classDate,
                "classorder":$scope.courses.classOrder,
                "shape":$scope.courses.shape
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(results){
            //刷新列表
            $log.log("000000000000000"+$scope.courses.classDate);
            console.log($scope.courses.classDate);
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
            $modalInstance.close();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}