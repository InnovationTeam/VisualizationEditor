<template>
    <el-aside width="50px" class="aside">
        <br>
        <i class="iconfont icon-form" @click="method1"></i>
        <br><br>
        <i class="iconfont icon-set" @click="method2"></i>
        <br><br>
        <i class="iconfont icon-similarproduct" @click="method3"></i>
        <br><br>
        <i class="iconfont icon-copy" @click="method4"></i>
    </el-aside>
</template>


<script>
    // 导入字体样式
    import '../assets/icons/iconfont.css'

    export default {
        name: 'left-bar',
        data () {
            return {
                
            }
        },
        methods:{
            method1: function(){
                alert("Icon1");
            },
            method2: function(){
                alert("Icon2");
            },
            method3: function(){
                alert("Icon3");
            },
            method4: function(){
                alert("Icon4");
            },
        }
    }
</script>

<style>
    .aside{
        background-color: #555555; 
        text-align: center;
    }
</style>