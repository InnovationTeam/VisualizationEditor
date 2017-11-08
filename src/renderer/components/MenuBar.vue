
<template>

<div class="menu-bar">
    <el-button-group>
        <div class="sub-menu">
            <el-button size="mini">文件(F)</el-button>
            <div class="dropdown-content">
                <a href="#">新建项目 Alt+Shift+P</a>
                <a href="#">新建文件 Ctrl+N</a>
                <a href="#">新建窗口 Ctrl+Shift+N</a>
                <a href="#">打开文件 Ctrl+O</a>
                <a href="#">打开文件夹 </a>
                <a href="#">打开最近的文件    ▸</a>
                <a href="#">保存</a>
                <a href="#">另存为</a>
                <a href="#">全部保存</a>
                <a href="#">自动保存</a>
                <a href="#">首选项    ▸</a>
                <a href="#">关闭编辑器</a>
                <a href="#">关闭文件夹</a>
                <a href="#">关闭窗口</a>
                <a href="#">重新加载</a>
                <a href="#">退出</a>
            </div>
        </div>
        <div class="sub-menu">
            <el-button size="mini">编辑(E)</el-button>
            <div class="dropdown-content" style="left:-353px;"> 
                <a href="#">撤销 Ctrl+Z</a>
                <a href="#">恢复 Ctrl+Y</a>
                <a href="#">剪切 Ctrl+X</a>
                <a href="#">粘贴 Ctrl+C</a>
                <a href="#">查找 CtrK+F</a>
                <a href="#">替换 Ctrl+R</a>
                <a href="#">在文件中查找 Ctrl+Shift+F</a>
                <a href="#">切换行注释 Ctrl+/</a>
                <a href="#">切换块注释 Alt+Shift+A</a>
            </div>
        </div>
        <div class="sub-menu">
            <el-button size="mini">选择(S)</el-button>
            <div class="dropdown-content" style="left:-283px;">
                <a href="#">全选 Ctrl+A</a>
                <a href="#">向上复制一行 Alt+Shift+Up Arrow</a>
                <a href="#">向下复制一行 Alt+Shift+Down Arrow</a>
                <a href="#">向上移动一行 Alt+Up Arrow</a>
                <a href="#">向下移动一行 Alt+Down Arrow</a>
                <a href="#">在上面添加游标 Alt+Ctrl+Up Arrow</a>
                <a href="#">在下面添加游标 Alt+Ctrl+Down Arrow</a>
                <a href="#">在行尾添加游标 Alt+Shift+I</a>
                <a href="#">添加下一个匹配项 Ctrl+D</a>
                <a href="#">添加上一个匹配项</a>
                <a href="#">选择所有匹配项 Ctrl+Shift+L</a>
            </div>
        </div>
        <div class="sub-menu">
            <el-button size="mini">查看(V)</el-button>
            <div class="dropdown-content" style="left:-213px;">
                <a href="#">资源管理器 Ctrl+Shift+E</a>
                <a href="#">搜索 Ctrl+Shift+F</a>
                <a href="#">问题 Ctrl+Shift+M</a>
                <a href="#">切换全屏 F11</a>
                <a href="#">切换Zen模式</a>
                <a href="#">拆分编辑器 Ctrl+\</a>
                <a href="#">切换编辑器组布局 Alt+Shift+1</a>
                <a href="#">切换工具栏 Ctrl +T</a>
                <a href="#">切换侧边栏 Ctrl+B</a>
                <a href="#">切换面板 Ctrl+J</a>
                <a href="#">隐藏状态栏</a>
                <a href="#">切换右边栏 Ctrl+L</a>
                <a href="#">切换呈现空格</a>
                <a href="#">放大 Ctrl+=</a>
                <a href="#">缩小 Ctrl+-</a>
                <a href="#">重置缩放</a>
            </div>
        </div>
        <div class="sub-menu">
            <el-button size="mini">转到(G)</el-button>
            <div class="dropdown-content" style="left:-143px;">
                <a href="#">返回 Alt+Left Arrow</a>
                <a href="#">前进 Alt+Right Arrow</a>
                <a href="#">转到文件... Ctrl+PS</a>
                <a href="#">转到定义... F12</a>
            </div>
        </div>
        <div class="sub-menu">
            <el-button size="mini">帮助(H)</el-button>
            <div class="dropdown-content" style="left:-72px;">
                <a href="#">发行说明</a>
                <a href="#">查看许可证 </a>
                <a href="#">用户反馈</a>
                <a href="#">欢迎页</a>
                <a href="#">检查更新</a>
                <a href="#">关于</a>
            </div>
        </div>
    </el-button-group>
</div>

</template>



<script>
export default {

}
</script>



<style>

/* 菜单栏布局css */
.menu-bar{
    width: 1100px;
    background-color:#e3e3e4;
    text-align: left;

}


/* 菜单栏按钮css */
.sub-menu{
    position: relative;
    display: inline;
    z-index:1000;
}

.el-button{
    border: 0px;
    background-color:#e3e3e4;
    color: black;
}



.el-button:hover{
    background-color: #e3e3e4;
    color: black;
 }

 /* .el-button:active{
    background-color: #b6b0b0;
    color: black;
 } */

 .el-button:focus{
    background-color: #b6b0b0;
    color: black;
 }


/* 子菜单布局和内容css */
.dropdown-content {
    display: none;
    position: absolute;
    top: 40px;
    /* left间隔70px */
    background-color: #f9f9f9;
    min-width: 160px;
    border: gainsboro solid 1px;
    text-align: left;
}

.show-dropdown-content{
    display: block;
}

.dropdown-content a {
    color: black;
    padding: 6px 16px;
    text-decoration: none;
    font-size: 12px;
    display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.sub-menu:hover .dropdown-content {
    display: block;
}




</style>

