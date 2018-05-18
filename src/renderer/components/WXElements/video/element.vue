<template>
    <div :class="['wx-video', cfgData.domClass]" :data-wx-element-id="id">
        <video :id="id" class="video-js  vjs-big-play-centered" controls preload="auto" poster ref="videoDom" style="width:300px;height:225px" :data-wx-element-id="id">
            <source :src="cfgData.src" type='video/mp4' :data-wx-element-id="id">
        </video>
        <slot></slot>
    </div>
</template>

<script>
import elementAttributeData from './attributes.json'
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'

var videoId;

export default {
    props: {
        cfgData: Object,
        id: {
            default: ''
        }
    },
    data() {
        return {
            attributes: elementAttributeData
        }
    },
    mounted(){
        videojs(this.$refs.videoDom,{
            controlBar: {
                volumePanel: false,
            }	
        },function(){
            //增加“弹幕”按钮
            var newbtn = document.createElement('btn');
            newbtn.innerHTML = '<button class="vjs-control" style="color:#1AAD19;border:1px solid #1AAD19;" id="danmuButton">弹幕</button>';
            var controlBar = document.getElementsByClassName('vjs-control-bar')[0];
            var insertBeforeNode = document.getElementsByClassName('vjs-fullscreen-control')[0];
            controlBar.insertBefore(newbtn,insertBeforeNode);
        })

    }
}



</script>

<style lang="scss">

</style>



