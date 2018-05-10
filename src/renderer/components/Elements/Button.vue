<template>
    <div class="button" >
        <button :class="this.classList" :style="this.attr['style']" :disabled="this.disabled">
            <template v-if="this.attr['loading'] === 'true'">
                <img :class="this.size? 'button-attr-loading-default' : 'button-attr-loading-mini'" src="../../../static/images/loading.gif">
            </template>
            {{this.children[0].text}}
        </button>
    </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
      attr: Object,
      children: Array
  },
  computed: {
      classList: function(){
        var classlist = this.attr['class'];

        if(!classlist){
            classlist = new Array();
        }

        var type = this.attr['type'];
        var size = this.attr['size'];

        var disabled = this.attr['disabled'] === 'true';
        var plain = this.attr['plain'] === "true";

        if(type){
            switch(type){
                case "default":
                    classlist.push('button-type-default');
                    if(plain){
                        classlist.push('button-attr-default-plain');
                    }
                    break;
                case "primary":
                    classlist.push('button-type-primary');
                    if(plain){
                        classlist.push('button-attr-primary-plain');
                    }
                    break;
                case "warn":
                    classlist.push('button-type-warn');
                    if(plain){
                        classlist.push('button-attr-warn-plain');
                    }
                    break;
            }
        }else{
            classlist.push('button-type-default');
            if(plain){
                classlist.push('button-attr-default-plain');
            }
        }

        if(size){
            switch(size){
                case "default":
                    classlist.push('button-size-default');
                    break;
                case "mini":
                    classlist.push('button-size-mini');
                    break;
                default:
                    break;
            }
        }else{
            classlist.push('button-size-default');
        }


        if(disabled){
            classlist.push('button-attr-disabled');
        }
        
        return classlist;
      },
      size: function(){
          if(this.attr['size']){
              return this.attr['size'] === 'default';
          }else{
              return true;
          }
      },
      disabled: function(){
          return this.attr['disabled'] === 'true';
      }

  }
}
</script>

<style>
button{

	border-radius:5px;
    
    text-align: center;
    text-decoration: none;
    display: inline-block;
    
    cursor: pointer;
}

.button{
	display: inline-block;
}

.button-type-default{
	border: 1px solid #D7D7D7;
    background-color: #f8f8f8;
    color: rgb(49, 44, 44);
}

.button-type-primary{
	border: 1px solid #1AAD19;
    background-color: #1AAD19;
    color: white;
}

.button-type-warn{
	border: 1px solid #E64340;
    background-color: #E64340;
    color: white;
}

.button-size-default{
    min-width:65px;
    min-height:43px;
    font-size: 18px;
    padding-left: 12px; 
    padding-right: 12px;
}

.button-size-mini{
    min-width:65px;
    min-height:30px;
    font-size: 14px;
    padding-left: 12px; 
    padding-right: 12px;
	
}

.button-attr-primary-plain{
	background-color: white !important;
	color: #1AAD19 !important;
}

.button-attr-default-plain{
	background-color: white !important;
	color: rgb(49, 44, 44) !important;
	border-color: rgb(49, 44, 44) !important;
}

.button-attr-warn-plain{
	background-color: white !important;
	color: #E64340 !important;
	
}

.button-attr-loading-default{
	height: 15px;
	padding-right: 3px;
}

.button-attr-loading-mini{
	height: 10px;
	padding-right: 1px;
}

.button-attr-disabled{
	opacity:0.4;
}
</style>

