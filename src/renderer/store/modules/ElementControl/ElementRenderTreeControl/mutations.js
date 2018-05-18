import css2json from '@/../api/css2json'
import {wxml2json, json2wxml} from '@/../api/wxml2json'
import fs, { stat } from 'fs'
import WXElements from '@/components/WXElements'

export default {
    APPEND_CHILD(state, { id, tagName, cfgData }) {
        let newID = Math.floor(Math.random() * 10000).toString()
        while (state.info[newID] !== undefined) {
            newID = Math.floor(Math.random() * 10000).toString()
        }

        if (id === 'main') {
            state.children.push(newID)
        }
        else {
            state.info[id].children.push(newID)
        }

        state.info[newID] = {
            id: newID,
            cfgData: JSON.parse(JSON.stringify(cfgData)),
            tagName: tagName,
            children: [],
            fatherID: id,
            type: 'element'
        }
    },
    MOVING_ELEMENT(state, {fatherID, targetID, elementID}) {
        console.log(targetID)

        // 在父节点中删除移动的节点
        let children = []
        if (fatherID === 'main') {
            children = state.children
        }
        else {
            children = state.info[fatherID].children
        }
        children.splice(children.indexOf(elementID), 1)

        // 在目标节点中添加移动的节点
        if (targetID === 'main') {
            state.children.push(elementID)
        }
        else {
            state.info[targetID].children.push(elementID)
        }

        // 将移动节点的父节点改为目标节点
        state.info[elementID].fatherID = targetID
    },
    FOCUS_ELEMENT(state, {elementID}) {
        state.currentFocusElementID = elementID
    },
    PARSE_WXSS_FILE(state, path) {
        state.currentPageStyle = JSON.parse(JSON.stringify(css2json.css2json(path)))
        console.log(state.currentPageStyle)
    },
    PARSE_WXML_FILE(state, path) {
        if(fs.existsSync(path)) {
            let content = fs.readFileSync(path, {encoding: 'utf-8'})
            if(content !== '') {
                let parsedWXML = wxml2json(content)
                console.log(parsedWXML)
                state.children = parsedWXML.children

                for(let id in parsedWXML.info) {
                    let tagName = parsedWXML.info[id].tagName
                    let attributes = WXElements[tagName].attributes
                    for(let attr in attributes){
                        if(attributes[attr].validValue !== undefined && parsedWXML.info[id].cfgData[attr] !== undefined){
                            parsedWXML.info[id].cfgData[attr] = attributes[attr].validValue.indexOf(parsedWXML.info[id].cfgData[attr])
                        }
                        if(parsedWXML.info[id].cfgData[attr] === undefined) {
                            parsedWXML.info[id].cfgData[attr] = attributes[attr].defaultValue
                        }
                    }
                    if(parsedWXML.info[id].fatherID === 'root')
                        parsedWXML.info[id].fatherID = 'main'

                    if(parsedWXML.info[id].cfgData['domClass'] === undefined){
                        parsedWXML.info[id].cfgData['domClass'] = []
                    }
                }
                state.info = parsedWXML.info
            }
        }
    },
    EXPORT_TO_WXSS(state, {path, style}) {
        console.log(style)
        if(style !== undefined)
            css2json.save(style, path)
        else
            css2json.save(state.currentPageStyle, path)
    },
    EXPORT_TO_WXML(state, path) {
        let info = JSON.parse(JSON.stringify(state.info))

        for(let id in info) {
            let tagName = info[id].tagName
            let attributes = WXElements[tagName].attributes
            for(let attr in attributes){
                if(attributes[attr].validValue !== undefined && info[id].cfgData[attr] !== undefined){
                    // parsedWXML.info[id].cfgData[attr] = attributes[attr].validValue.indexOf(parsedWXML.info[id].cfgData[attr])
                    info[id].cfgData[attr] = attributes[attr].validValue[info[id].cfgData[attr]]
                }
            }
            if(info[id].fatherID === 'main')
                info[id].fatherID = 'root'
        }
        console.log(info)

        let content = json2wxml({
            children: state.children,
            info: info
        })
        // console.log(content)
        // console.log(JSON.stringify({
        //     children: state.children,
        //     info: state.info
        // }))
        // console.log(content)
        fs.writeFile(path, content, function(err){
            if(err) throw err;
        })
    }
}