$(function(){
    // 获取用户信息
    function getUserInfo(){
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg("获取用户信息失败");
                }
                // console.log(res);
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            },
            // 不论成功还是失败，最终都会调用 complete 回调函数
        })
    }
    getUserInfo();
    function renderAvatar(user){
        // console.log(user);
        // 1. 获取用户昵称
        var name = user.nickname || user.username;
        // 2. 设置欢迎的文本
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
        // 3. 按需渲染用户的头像
        if(user.user_pic !== null){
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        }else{
            // 渲染文本头像
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first);
        }
    }

    var layer = layui.layer;
    // 实现退出功能
    $('#btnLogout').on('click', function(){
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1. 清空本地存储中的token
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = '/login.html';
            // 关闭 confirm 询问框
            layer.close(index);
          });
    })
})