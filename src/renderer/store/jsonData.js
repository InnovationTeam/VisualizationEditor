import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        
    },
    state: {
        json: {
            "type": "root",
            "elemid": 'root',
            "children": [
                {
                    "type": "element",
                    "tag": "view",
                    "elemid": 'view1',
                    "attr": {
                        "class": "container"
                    },
                    "children": [
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button2',
                            "attr": {
                                "type": "primary",
                                "size": "default"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button3',
                            "attr": {
                                "type": "warn",
                                "size": "default"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button4',
                            "attr": {
                                "type": "default",
                                "size": "default"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button5',
                            "attr": {
                                "type": "primary",
                                "size": "mini"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button6',
                            "attr": {
                                "type": "warn",
                                "size": "mini",
                                "disabled": "true"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        },
                        {
                            "type": "element",
                            "tag": "button",
                            "elemid": 'button7',
                            "attr": {
                                "type": "default",
                                "size": "mini",
                                "loading": "true"
                            },
                            "children": [
                                {
                                    "type": "text",
                                    "text": "按钮"
                                }
                            ]
                        }
                    ]
                }
            ]
        }        
    },
    mutations: {
    
    }
}) 