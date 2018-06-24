
'use strict';

function PermissionCtrl ($scope, $http, $modal,constantIP){
    console.log("加载权限管理..."+constantIP);

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
    $scope.IDs={};
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {

        console.log($scope.IDs.ID);
        $http({
            method: 'POST',
            url: 'http://'+constantIP+':8080/shhTest/calltherollaction/getCallTheRollByID',
            data: {
                "id":$scope.IDs.ID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(largeLoad) {
            console.log(largeLoad);
            var obj = $scope.gridOptions.selectedItems;
            obj.splice(0,obj.length);
            $scope.setPagingData(largeLoad.callTheRolls, page, pageSize);
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
    $scope.search = function(){
        $scope.getPagedDataAsync(10, 1, $scope.IDs.ID);
    };
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
            {field:'ID', displayName:'编号'},
            {field:'PermissionName', displayName:'权限名称'},
            {field:'PermissionID', displayName:'权限编号'},
            {field:'level', displayName:'等级'},
            {field:'PermissionDsc', displayName:'权限描述'}
        ]
    };
    //新增
    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/permission/permissionModel.html",
            controller: 'RoleInsertCtrl2',
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
            templateUrl: "/templates/permission/permissionModel.html",
            controller: 'RoleUpdateCtrl1',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

    //删除
    $scope.delete = function(){
        console.log("jijijijijijijijijijijijij");
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
            ids.push(selectedItems[i]["dname"]);
            // 直接传值，服务器是取名字
        }
        var json = {};
        for(var i1=0;i1<ids.length;i1++)
        {
            json[i1]=ids[i1];
        }
        JSON.stringify(json);
        $http({
            method: 'POST',
            url: 'http://'+constantIP+':8080/shhTest/ddRoleaction/deleteDdRoleByName',
            params: {
                "dname": json
            }
        }).then(function(results){
            //刷新列表
            console.log(json);
        }).then(function (response) {
            var grid = $scope;
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
        });
    };
}


