<template>
    <div v-if="this.element.type != 'text'"  
        @dragstart="dragstart_handler($event);" @dragover="dragover_handler($event);" @drop="drop_handler($event);"
        @click="click($event)" :draggable="true" :id="this.element.id" class="draggable">

        <template v-if="this.hasChildren">
            <span class="icon"><icon :class="show ? 'opened' : 'closed'" iconType="angle_right"/></span>
        </template>
        
        {{element.tagName}}

        <template v-if="this.show">
            <Hierarchy class="children" :children='this.element.children'></Hierarchy>
        </template>
    </div>
</template>

<script>
import Icon from '../common/Icon';


export default {
    name: 'Layer',
    data() {
        return {
            show: true
        }
    },
    props: {
        element: Object
    },
    methods:{
        GetID: function(){
            return this.element.id;
        },
        dragstart_handler: function(ev){
            // 防止事件冒泡
            ev.stopPropagation();
            var id = ev.target.attributes['id'].value;
            ev.dataTransfer.setData("id", id);

            this.show = false;
        },
        dragover_handler: function(ev){
            // 防止事件冒泡
            ev.stopPropagation();
            // 使用preventDefault避免对其他事件的处理
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move";

            return false;
        },
        drop_handler: function(ev){
            // 防止事件冒泡
            ev.stopPropagation();
            // 使用preventDefault避免对其他事件的处理
            ev.preventDefault();
            
            var childID = ev.dataTransfer.getData("id");
            var targetID = ev.target.attributes['id'].value;
            if(childID === targetID){
                return;
            }

            let fatherID = this.$store.getters['ElementControl/getInfoByID'](childID).fatherID;
            
            this.$store.commit('ElementControl/MOVING_ELEMENT', {
                        fatherID: fatherID,
                        targetID: targetID,
                        elementID: childID
                    })

        },
        click: function(ev){
            ev.stopPropagation();
            ev.preventDefault();
            this.show = !this.show;
        }
    },
    computed: {
        hasChildren: function(){
            if(this.element.children.length > 1){
                return true;
            }else if(this.element.children.length === 1){
                var info = this.$store.getters['ElementControl/getInfo'];
                if(info[this.element.children[0]].type != 'text'){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    },
    components: {
        'icon': Icon
    }
}
</script>

<style lang="scss" scoped>
.draggable {
    will-change: transform;
    text-align:left;
    /* cursor: move; */
    transition: all 200ms;
    user-select: none;

    position: relative;
    width: 100%;
    font-family: 'Arial';
    font-size: 14px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.draggable:hover:after {
    opacity: 1;
    transform: translate(0);
}

.over {
    transform: scale(1.1, 1.1);
}


.children{
    margin-left: 15px;
}

.down{
    transform: rotate(90deg);
}

.icon {
    width: 20px;
    text-align: center;
    float: left;

    &.opened {
        transform: rotate(90deg);
        transition: .2s;
    }

    &.closed {
        transform: rotate(0deg);
        transition: .2s;
    }
}
</style>
