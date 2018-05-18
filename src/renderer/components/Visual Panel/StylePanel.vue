<template>
    <div class="style-panel">
        <div class="wxss-file-panel">
            <div class="wxss-file-name">
                <span class="name">wxss</span>
                <div class="button">
                    <icon :iconType="'refresh'" @click.native="Refresh"/>
                </div>
                <div class="button">
                    <icon :iconType="'save'" @click.native="Save"/>
                </div>
                <div class="button" style="float: right; font-size: 20px;" @click="toggleAddSelector">
                    +
                </div>
            </div>
            <div class="wxss-file-content scrollable-y">
                <div v-if="showAddSelectorInput" class="add-selector">
                    <div class="add-selector-title">New Selector:</div>
                    <div class="add-selector-input">
                        <input type="text" v-model="newSelectorName">
                    </div>
                    <icon :iconType="'tick'" style="cursor: pointer;" @click.native="AddSelector"/>
                </div>


                <template v-for="(css, selectorIndex) in cssData">
                    <div v-if="css.selector !== 'type-comment'" class="selector-name" :key="css.selector + selectorIndex">
                        <div :class="['icon', css.isOpen ? 'opened' : 'closed']" 
                        @click.left.stop="toggleOpen(selectorIndex)" @click.right.stop="ChangeSelectorName(true, selectorIndex)">
                            <icon :iconType="'angle_right'" />
                        </div>
                        <div v-if="changeSelectorIndex !== selectorIndex" style="display: inline-block" 
                        @click.left.stop="toggleOpen(selectorIndex)" @click.right.stop="ChangeSelectorName(true, selectorIndex)">{{ css.selector }} ({{css.protos.length}})</div>
                        <div v-else style="display: inline-block">
                            <input type="text" v-model="changingSelectorName" @click.stop v-focus="changingSelectorName"
                            @blur="ChangeSelectorName(false, selectorIndex)" @keyup.enter="ChangeSelectorName(false, selectorIndex)" spellcheck="false">
                        </div>
                        <div style="float: right; font-size: 20px; width: 20px; text-align: center;" @click.stop="ShowAddAttributeInput(selectorIndex)">
                            +
                        </div>
                        <icon class="button" :iconType="'trash'" style="float: right; height: 20px;" @click.native.stop="DeleteSelector(selectorIndex)"/>
                    </div>

                    <div :class="['attributes', css.isOpen ? 'opened' : 'closed']" :key="css.selector + selectorIndex + 'attributes'"> 
                        <div v-if="changeAttrSelectorIndex === selectorIndex && showAddAttributeInput">
                            <div style="display: inline-block; width: 100px;">
                                <input type="text" v-model="newAttributeName">
                            </div>
                            : 
                            <div style="display: inline-block; width: 150px;">
                                <input type="text" v-model="newAttributeValue">
                            </div>
                            <icon :iconType="'tick'" style="cursor: pointer;" @click.native="AddAttribute(selectorIndex)"/>
                        </div>

                        <template v-for="(attr, attrIndex) in css.protos">
                            <div :key="attr.property + attr.value + attrIndex" @click.right="ChangeAttrValue(true, selectorIndex, attrIndex)">
                                <span style="cursor: pointer;" @click="DeleteAttr(selectorIndex, attrIndex)">x</span>
                                {{attr.property}}: 
                                <span v-if="changeAttrSelectorIndex !== selectorIndex || changeAttrIndex !== attrIndex">{{attr.value}}</span>
                                <div v-else style="display: inline-block; width: 100px;">
                                    <input type="text" v-model="changingAttrValue" @click.stop v-focus="changingAttrValue"
                                    @blur="ChangeAttrValue(false, selectorIndex, attrIndex)" 
                                    @keyup.enter="ChangeAttrValue(false, selectorIndex, attrIndex)" spellcheck="false">
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>

        <div class="component-cfg-panel">
            <div class="component-name">
                {{ currentFocusElementInfo.tagName }}
            </div>

            <div v-if="currentFocusElementInfo.cfgData !== undefined" class="scrollable-y" style="height: inherit;">
                <div class="cfg-content">
                <div class="class">
                    <div :class="['icon', showClass ? 'opened' : 'closed']" @click.left="showClass = !showClass" style="inline-block">
                        <icon :iconType="'angle_right'" />
                    </div>
                    <div style="display: inline-block" @click.left="showClass = !showClass">
                    class({{currentFocusElementInfo.cfgData.domClass.length}}):
                    </div>
                    <div style="float: right; font-size: 20px; width: 20px; text-align: center; cursor: pointer;" @click="ShowAddClassInput">
                        +
                    </div>
                </div>

                <div :class="['class-item', showClass ? 'opened' : 'closed']"> 
                    <div v-if="showAddClassInput" style="height: 30px; padding-left: 5px;">
                        <div style="display: inline-block; width: 150px;">
                            <input type="text" v-model="newClass">
                        </div>
                        <icon :iconType="'tick'" style="cursor: pointer;" @click.native="AddClass"/>
                    </div>
                    
                    <template v-for="(domClass, classIndex) in currentFocusElementInfo.cfgData.domClass">
                        <div :key="domClass + classIndex" style="height: 30px; padding-left: 5px;">
                            <span style="cursor: pointer;" @click="DeleteClass(classIndex)">x</span>
                            <span>{{domClass}}</span>
                        </div>
                    </template>
                </div>


                <template v-for="(attr, attrName) in elementAttributes">
                    <div class="item-box" :key="attrName">
                        <div class="attribute-item" :key="attrName">
                            <span class="attribute-name">{{ attrName }}:</span>
                            <span class="attribute-value">
                                <div v-if="attr.valueType === 'String'" class="select-wrapper">
                                    <select v-model="currentFocusElementInfo.cfgData[attrName]">
                                        <option v-for="(value, index) in attr.validValue" 
                                            :key="attrName + '-' + index" 
                                            :value="index">
                                        {{ value }}
                                        </option>
                                    </select>
                                </div>

                                <template v-if="attr.valueType === 'Boolean'">
                                    <input :id="attrName" v-model="currentFocusElementInfo.cfgData[attrName]" type="checkbox">
                                    <label :for="attrName">
                                        <icon :iconType="currentFocusElementInfo.cfgData[attrName] ? 'checkbox_checked' : 'checkbox_unchecked'" />
                                    </label>
                                </template>

                                <template v-if="attr.valueType === 'Text'">
                                    <input v-model="currentFocusElementInfo.cfgData[attrName]" type="text">
                                </template>
                            </span>
                        </div>
                    </div>
                </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/common/Icon'
import WXElements from '@/components/WXElements'
import css2json from '@/../api/css2json'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ElementControl')

export default {
    data() {
        let filePath = this.$store.getters['FileControl/getActiveWXSSFilePath']
        // let parsedCSS = css2json.css2json('./static/test/index.wxss')
        let parsedCSS = JSON.parse(JSON.stringify(this.$store.getters['ElementControl/getCurrentPageStyle']))
        for(let css of parsedCSS) {
            css['isOpen'] = false
        }
        console.log(parsedCSS)

        return {
            filePath: filePath,
            cssData: parsedCSS,
            showClass: false,
            showAddClassInput: false,
            newClass: '',

            showAddSelectorInput: false,
            newSelectorName: '',

            showAddAttributeInput: false,
            newAttributeName: '',
            newAttributeValue: '',

            currOveredSelector: -1,
            changeSelectorIndex: -1,
            changingSelectorName: '',

            changeAttrSelectorIndex: -1,
            changeAttrIndex: -1,
            changingAttrValue: ''
        }
    },
    computed: {
        ...mapGetters({
            currentFocusElementInfo: 'getCurrentFocusElementInfo'
        }),
        elementAttributes() {
            console.log(WXElements[this.currentFocusElementInfo.tagName].attributes)
            return WXElements[this.currentFocusElementInfo.tagName].attributes
        }
    },
    methods: {
        reloadCSS() {
            let cssTag = document.getElementById('dynamicCSS');
            let head = document.getElementsByTagName('head').item(0);
            if(cssTag) head.removeChild(cssTag);
            let css = document.createElement('link');
            css.href = this.$store.getters['FileControl/getActiveWXSSCacheFilePath'];
            console.log(this.$store.getters['FileControl/getActiveWXSSCacheFilePath'])
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.id = 'dynamicCSS';
            head.appendChild(css);
        },
        toggleOpen(index) {
            this.cssData[index].isOpen = !this.cssData[index].isOpen
            console.log(this.cssData[index].isOpen)
        },
        Refresh() {
            // let parsedCSS = css2json.css2json('./static/test/index.wxss')
            console.log(this.filePath)
            this.$store.commit('ElementControl/PARSE_WXSS_FILE', this.filePath)
            let parsedCSS = this.$store.getters['ElementControl/getCurrentPageStyle']
            for(let css of parsedCSS) {
                css['isOpen'] = false
            }
            // for(let css of parsedCSS) {
            //     css['isOpen'] = false
            // }
            // console.log(parsedCSS)
            console.log(parsedCSS)
            this.cssData = parsedCSS
            this.reloadCSS()
        },
        Save() {
            // css2json.save(this.cssData, './static/test/index.wxss')
            console.log(this.cssData)
            this.$store.commit('ElementControl/EXPORT_TO_WXSS', {path: this.filePath, style: this.cssData})
            this.reloadCSS()
        },
        toggleAddSelector() {
            this.showAddSelectorInput = !this.showAddSelectorInput
        },
        AddSelector() {
            console.log(this.newSelectorName)
            if(this.newSelectorName !== '')
            {
                this.cssData.push({
                    selector: this.newSelectorName,
                    protos: [],
                    isOpen: false
                })
                this.newSelectorName = ''
            }
            
            this.showAddSelectorInput = false
        },
        ShowAddAttributeInput(selectorIndex) {
            this.cssData[selectorIndex].isOpen = true
            this.showAddAttributeInput = true
            this.changeAttrSelectorIndex = selectorIndex
        },
        AddAttribute(selectorIndex) {
            if(this.newAttributeName !== '' && this.newAttributeValue !== '' ){
                this.cssData[selectorIndex].protos.push({
                    property: this.newAttributeName,
                    value: this.newAttributeValue
                })
            }
            this.newAttributeName = this.newAttributeValue = ''
            this.showAddAttributeInput = false
            this.changeAttrSelectorIndex = -1
        },
        ChangeSelectorName(isChange, index) {
            if(isChange) {
                this.changeSelectorIndex = index
                this.changingSelectorName = this.cssData[index].selector
            }
            else {
                this.cssData[index].selector = this.changingSelectorName
                this.changeSelectorIndex = -1
            }
        },
        ChangeAttrValue(isChange, selectorIndex, attrIndex) {
            if(isChange) {
                this.changeAttrSelectorIndex = selectorIndex
                this.changeAttrIndex = attrIndex
                this.changingAttrValue = this.cssData[selectorIndex].protos[attrIndex].value
            }
            else {
                this.cssData[selectorIndex].protos[attrIndex].value = this.changingAttrValue
                this.changeAttrIndex = -1
                this.changeAttrSelectorIndex = -1
            }
        },
        DeleteSelector(selectorIndex) {
            this.cssData.splice(selectorIndex, 1)
        },
        DeleteAttr(selectorIndex, attrIndex) {
            this.cssData[selectorIndex].protos.splice(attrIndex, 1)
        },
        ShowAddClassInput() {
            this.showAddClassInput = true
            this.showClass = true
        },
        AddClass() {
            if(this.newClass !== '') {
                this.currentFocusElementInfo.cfgData.domClass.push(this.newClass)
            }
            this.newClass = ''
            this.showAddClassInput = false
        },
        DeleteClass(index) {
            this.currentFocusElementInfo.cfgData.domClass.splice(index, 1)
        }
    },
    directives: {
        focus: {
            inserted(el, {value}) {
                el.focus()
                el.setSelectionRange(0, -1)
            }
        }
    },
    components: {
        'icon': Icon
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/scrollbar';
@import '~@/assets/common/border';
@import '~@/assets/common/select';

.style-panel {
    position: relative;
    float: left;
    width: 400px;
    height: inherit;
    background-color: #f5f5f5;
    @include thin_border(#d2d2d2, left right);

    & > .wxss-file-panel {
        height: 500px;
        background-color: #f8fbfd;
        @include thin_border(#d2d2d2, bottom);

        & > .wxss-file-name {
            height: 30px;
            line-height: 30px;
            width: inherit;
            background-color: #f5f5f5;
            @include thin_border(#d2d2d2, bottom);

            & > .name {
                float: left;
                margin-left: 10px;
                margin-right: 5px;
            }

            & > .control-buttons {
                height: 30px;
                width: 45px;
                float: left;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
        }

        & > .wxss-file-content {
            height: 460px;
            padding: 5px;
            font-family: 'Consolas';

            & > div {
                height: 20px;
            }

            & > .selector-name {
                line-height: 20px;
                height: 20px;
                // display: flex;
                // align-items: center;
                cursor: pointer;

                & > .icon {
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
            }

            & > .attributes {
                height: auto;
                padding-left: 30px;
                &.opened {
                    display: block;
                }
                &.closed {
                    display: none;
                }

                & > div {
                    height: 20px;
                }
            }
        }
    }

    
}

.button {
    width: 30px;
    height: 30px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & > span {

        &:hover {
            font-size: 18px;
        }

        &:active {
            font-size: 16px;
        }
    }
}

.component-cfg-panel {
    position: absolute;
    top: 500px + 1px;
    bottom: 0;
    width: 100%;
    background-color: #f8fbfd;

    & > .component-name {
        position: absolute;
        top: 0;
        height: 30px;
        right: 0;
        left: 0;
        line-height: 30px;
        padding-left: 10px;
        background-color: #f5f5f5;
        @include thin_border(#d2d2d2, bottom);
    }

    & > div {
        position: absolute;
        top: 30px;
        right: 0;
        left: 0;
        bottom: 0;
        & > .cfg-content {
            height: inherit;
            padding: {
                left: 20px;
                right: 20px;
            }
            font-family: 'Consolas';

            & > .class {
                height: 30px;
                line-height: 30px;

                & > .icon {
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

            }

            & > .class-item {
                height: auto;
                width: inherit;
                padding: {
                    left: 20px;
                }
                &.opened {
                    display: block;
                }
                &.closed {
                    display: none;
                }

            }

            & > .item-box {
                height: 30px;

                &  .attribute-item {

                & > .attribute-name {
                    float: left;
                }

                & > .attribute-value {
                    float: right;
                    width: 120px;
                    height: inherit;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & > label {
                        height: 30px;
                        width: 250px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 25px;

                        & > span {
                            cursor: pointer;
                        }
                    }
                }
                }
            }
        }
    }
}
    

.add-selector {
    margin: {
        bottom: 5px;
        left: 10px;
        right: 10px;
    }
    height: 20px;

    & > .add-selector-title {
        height: inherit;
        line-height: 20px;
        display: inline-block;
    }
    & > .add-selector-input {
        display: inline-block;
        width: 200px;
    }
}

input[type="checkbox"] {
    display: none;
}

input[type="text"] {
    font-family: 'Consolas', 'Microsoft YaHei';
    width: 100%;
    height: 20px;
    background-color: #ffffff;
    border: 1px solid #646464;
    width: 100%;
    color: #222;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: inset 0 1px 2px rgba(19, 45, 71, 0.075);
}
</style>
