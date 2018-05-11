<template>
    <div class="element-item">
        <div class="element-name" @click="ToggleTab">
            <span class="icon">
                <icon :class="isOpen ? 'opened' : 'closed'" :iconType="'angle_right'" />
            </span>
            <span class="name">{{ elementName }}</span>
        </div>

        <div :class="['element-configuration', isOpen ? 'opened' : 'closed']" ref="test">
            <div class="options-box">
                <div class="options">
                    <span :class="selectedOption === 1 ? 'selected' : ''" @click="Select(1)">基础</span>
                    <span :class="selectedOption === 2 ? 'selected' : ''" @click="Select(2)">自定义</span>
                    <span :class="selectedOption === 3 ? 'selected' : ''" @click="Select(3)">高级</span>
                </div>
            </div>

            <div class="preview-window-box">
                <div class="preview-window">
                    <slot name="element-preview" :cfgData="cfgData"></slot>
                </div>
            </div>

            <div class="option-panel"> 
                <template v-for="(cfg, name) in prebuilts" v-if="selectedOption === 1">
                    <div class="item-box" :key="elementName + '-' + name">
                        <div :class="['cfg-item', name === selectedPrebuilts ? 'selected' : '']" @click="SelectPrebuilt(name)">
                            {{ name }}
                        </div>
                    </div>
                </template>

                <template v-for="(name, index) in customCfgNames" v-if="selectedOption === 2">
                    <div class="item-box" :key="elementName + '-' + name">
                        <div class="cfg-item" :key="index">{{ name }}</div>
                    </div>
                </template>

                <template v-for="(attr, attrName) in attributes" v-if="selectedOption === 3">
                    <div class="item-box" :key="elementName + '-' + attrName">
                        <div class="attribute-item" :key="elementName + '-' + attrName">
                            <span class="attribute-name">{{ attrName }}:</span>
                            <span class="attribute-value">
                                <div v-if="attr.valueType === 'String'" class="select-wrapper">
                                    <select v-model="cfgData[attrName]">
                                        <option v-for="(value, index) in attr.validValue" 
                                            :key="elementName + '-' + attrName + '-' + index" 
                                            :value="index">
                                        {{ value }}
                                        </option>
                                    </select>
                                </div>

                                <template v-if="attr.valueType === 'Boolean'">
                                    <input :id="elementName + '-' + attrName" v-model="cfgData[attrName]" type="checkbox">
                                    <label :for="elementName + '-' + attrName">
                                        <icon :iconType="cfgData[attrName] ? 'checkbox_checked' : 'checkbox_unchecked'" />
                                    </label>
                                </template>

                                <template v-if="attr.valueType === 'Text'">
                                    <input v-model="cfgData[attrName]" type="text">
                                </template>
                            </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/common/Icon'
export default {
    props: {
        elementName: String,
        attributes: Object,
        prebuilts: Object
    },
    data() {
        let cfgData = {}
        // 先初始化为默认值，然后使用第一个预设配置设置值
        for(let attrName in this.attributes) {
            cfgData[attrName] = this.attributes[attrName].defaultValue
        }

        let selectedPrebuiltsDefault = ''
        for(let prebuiltName in this.prebuilts) {
            selectedPrebuiltsDefault = prebuiltName

            for(let attrName in this.prebuilts[prebuiltName]) {
                cfgData[attrName] = this.prebuilts[prebuiltName][attrName]
            }
            break;
        }

        return {
            isOpen: false,
            selectedOption: 1,
            
            selectedPrebuilts: selectedPrebuiltsDefault,
            customCfgNames: ['1', '2', '3'],

            cfgData: cfgData
        }
    },
    methods: {
        ToggleTab() {
            this.isOpen = !this.isOpen
        },
        Select(item) {
            this.selectedOption = item
        },
        SelectPrebuilt(prebuiltName) {
            this.selectedPrebuilts = prebuiltName

            // 如果预设值里没有某个属性，将该属性置为默认值
            for(let attrName in this.cfgData) {
                if(this.prebuilts[prebuiltName][attrName] === undefined)
                    this.cfgData[attrName] = this.attributes[attrName].defaultValue
                else
                    this.cfgData[attrName] = this.prebuilts[prebuiltName][attrName]
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
@import '~@/assets/common/select';

$element-panel-width: 300px;

$element-name-height: 30px;
$element-name-color-base: greenyellow;
$element-name-color-hover: yellow;

$element-options-box-height: 50px;
$element-options-width: 250px;
$element-options-opt-height: 30px;
$element-options-opt-selected-color: black;

$element-preview-window-box-height: 100px;
$element-preview-window-width: 200px;

$element-option-panel-height: 220px;
$element-option-panel-margin-top: 15px;

$element-opt-item-height: 30px;
$element-opt-item-width: 250px;
$element-opt-item-margin-left: ($element-panel-width - $element-opt-item-width) / 2;

$element-attribute-value-width: 120px;

$element-configuration-height: 
    $element-options-box-height + $element-preview-window-box-height + $element-option-panel-height + $element-option-panel-margin-top + 10px;
$element-configuration-color: #e2e2e2;


.element-item {
    width: 100%;

    & > .element-name {
        height: $element-name-height;
        line-height: $element-name-height;
        background-color: $element-name-color-base;
        cursor: pointer;

        &:hover {
            background-color: $element-name-color-hover;
        }

        & .name {
            float: left;
        }

        & .icon {
            width: $element-name-height;
            text-align: center;
            float: left;

            & .opened {
                transform: rotate(90deg);
                transition: .2s;
            }

            & .closed {
                transform: rotate(0deg);
                transition: .2s;
            }
        }
    }
    
    & > .element-configuration {
        background-color: $element-configuration-color;
        overflow: hidden;
        align-items: center;

        &.opened {
            height: auto;
            padding-bottom: 15px;
            // height: $element-configuration-height;
            // transition: all .3s;
        }

        &.closed {
            height: 0;
            // transition: all .3s;
        }

        & > .options-box {
            height: $element-options-box-height;
            display: flex;
            align-items: center;
            @include autoAlign($element-panel-width);

            & .options {
                width: $element-options-width;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                & span {
                    height: $element-options-opt-height;
                    line-height: $element-options-opt-height;
                    text-align: center;
                    cursor: pointer;

                    &.selected {
                        border-bottom: 2px solid $element-options-opt-selected-color;
                        font-weight: bold;
                    }

                }
            }
        }

        & > .preview-window-box {
            height: $element-preview-window-box-height;
            @include autoAlign($element-panel-width);

            & .preview-window {    
                height: inherit;        
                width: $element-preview-window-width;
                margin: 0 auto;

                border-radius: 2px;
                border: 1px solid black;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        & > .option-panel {
            // height: $element-option-panel-height;
            height: auto;
            margin-top: $element-option-panel-margin-top;

            & > .item-box {
                height: $element-opt-item-height;
                @include autoAlign($element-panel-width);

                & > div {
                    margin: 10px auto;
                    height: inherit;
                    width: $element-opt-item-width;
                    line-height: $element-opt-item-height;
                }

                & > .cfg-item {
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid;
                    border-radius: 2px;

                    &.selected {
                        background-color: #3dc76d;
                    }
                }

                & > .attribute-item {

                    & > .attribute-name {
                        float: left;
                    }

                    & > .attribute-value {
                        float: right;
                        width: $element-attribute-value-width;
                        height: inherit;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        & > label {
                            height: $element-opt-item-height;
                            width: $element-opt-item-height;
                            line-height: $element-opt-item-height;
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

input[type="checkbox"] {
    display: none;
}

input[type="text"] {
    font-family: Consolas;
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
