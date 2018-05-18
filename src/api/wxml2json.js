
// 输入组件id和新格式的json，从父组件children移除组件id
function remove(id, json) {
    // let children_id = json["info"][id].children;
    let father_id = json["info"][id].fatherID;
    findParent_json_and_remove(id, father_id, json["info"]);
}

//输入组件id，info数组，将子组件id从父组件children移除
function findParent_json_and_remove(id, father_id, info) {
    if (father_id === 'root')
        return;
    let index = info[father_id].children.indexOf(id);
    if (index !== 1)
        info[father_id].children.splice(index, 1);
}

//输入组件id以及它的父组件id，将组件id插入到父组件children
function insert(id, father_id, json) {
    // let children_id = json["info"][id].children;
    json["info"][id].fatherID = father_id;
    findParent_json_and_insert(id, father_id, json["info"]);
}

//输入组件id、父组件id，info数组，将子子组件id加入父组件children
function findParent_json_and_insert(id, father_id, info) {
    if (father_id === 'root')
        return;
    if (info[father_id].children.indexOf(id) === -1)
        info[father_id].children.push(id);
}

//输入原始标准json，输出新格式json
function generate_json(origin_json) {
    var id_json = {};
    var root_id = 'root';
    // var root_id = "main";
    for (var i = 0; i < origin_json.children.length; i++) {
        if (!id_json.hasOwnProperty("children"))
            id_json["children"] = new Array();
        id_json["children"].push(nanoid(10));
    }
    id_json["info"] = {};
    for (var i = 0; i < origin_json.children.length; i++) {
        let t = identify_json(id_json, root_id, id_json["children"][i], origin_json.children[i]);
        id_json["info"][t["id"]] = t;
    }
    return id_json;
}

//为上者生成过程所调用方法,输入为新格式的json，父组件id，子组件id,还有标准格式json
function identify_json(id_json, father_id, child_id, data) {
    var temp = {};
    temp["id"] = child_id;
    temp["tagName"] = data["tag"];
    temp["children"] = new Array();
    // 文本text没有childrem
    if (data.hasOwnProperty("children")) {
        for (var i = 0; i < data.children.length; i++) {
            if (!temp.hasOwnProperty("children"))
                temp["children"] = new Array();
            temp["children"].push(nanoid(10));
        }
    }
    temp["fatherID"] = father_id;
    temp["cfgData"] = {};
    for (var k in data["attr"]) {
        var prop;
        if (k === 'class') {
            prop = 'domClass';
            temp["cfgData"][prop] = data["attr"][k].split(" ");
        } else if (k === 'style') {
            prop = 'domStyle';
            temp["cfgData"][prop] = data["attr"][k];
        } else if (k === 'id') {
            prop = 'domID';
            temp["cfgData"][prop] = data["attr"][k]
        } else {
            prop = k;
            if (data["attr"][k] === "true")
                data["attr"][k] = true;
            if (data["attr"][k] === "false")
                data["attr"][k] = false;

            temp["cfgData"][prop] = data["attr"][k]
        }
    }
    temp["type"] = data["type"];
    if (temp["type"] === "text") {
        temp["cfgData"]["text"] = data["text"];
    }
    // 文本text没有childrem
    if (data.hasOwnProperty("children")) {
        for (var i = 0; i < data.children.length; i++) {
            let t = identify_json(id_json, temp["id"], temp["children"][i], data.children[i]);
            // id_json["children"] = id_json["children"].concat(t["id"]);
            id_json["info"][t["id"]] = t;
        }
    }
    return temp;
}


function generate_text(new_json) {
    let new_new_json = {};
    new_new_json["children"] = new Array();
    new_new_json["info"] = {};
    let children = new_json["children"];
    for (let i = 0; i < children.length; i++) {
        new_new_json["children"].push(children[i]);
        //
        new_new_json["info"][children[i]] = new_json["info"][children[i]];
        filter_text(children[i], new_json, new_new_json);
    }
    return new_new_json;
}

function filter_text(father_id, new_json, new_new_json) {
    let children = new_json["info"][father_id]["children"];
    for (let i = 0; i < children.length; i++) {
        if (new_json["info"][children[i]]["type"] === 'text') {
            new_json["info"][father_id]['cfgData']["text"] = new_json["info"][children[i]]['cfgData']["text"];
            let t_id = children[i];
            new_json["info"][father_id]["children"].splice(i, 1);
        }
        else {
            new_new_json["info"][children[i]] = new_json["info"][children[i]];
            filter_text(children[i], new_json, new_new_json);
        }
    }
}

//输入新格式json，输出标准格式json
function recover_json(new_json) {
    let origin_json = {};
    origin_json["type"] = 'root';
    origin_json["children"] = new Array();
    let child_ids = new_json["children"];
    // let child_maps = new Array();
    // for(let i=0;i<child_ids.length;i++){
    //     child_maps[child_ids[i]]=0;
    // }
    for (let i = 0; i < child_ids.length; i++) {
        // if(child_maps[child_ids[i]] === 0)
        origin_json["children"].push(findChild_json_and_insert(new_json, child_ids[i]));
    }
    return origin_json;
}

//为上者生成过程中所调用方法，输入为新格式json，寻找子组件的id，
//还有已经添加的子组件child_maps，防止重复添加(由于根存的不是所有子组件的id)
function findChild_json_and_insert(new_json, id) {
    // if(child_maps[id] ===0)
    // child_maps[id] = 1;
    let temp = {};
    temp["children"] = new Array();
    // temp["id"] = id;
    temp["type"] = new_json["info"][id]["type"];
    if (temp["type"] !== 'text') {
        temp["tag"] = new_json["info"][id]["tagName"];
        // temp["attr"] = new_json["info"][id]["cfgData"];
        var obj = new_json["info"][id]["cfgData"];
        temp["attr"] = {};
        for (var prop in obj) {
            if (prop === 'domClass') {
                if(obj[prop].length > 0){
                    temp["attr"]["class"] = obj[prop].join(' ');
                    console.log('parse');
                }
            } else if (prop === 'domStyle') {
                // console.log(obj[prop].toString())
                // if(obj[prop]){
                //     temp["attr"]["style"] = obj[prop];
                // }
            } else if (prop === 'domID') {
                if(obj[prop] !== ''){
                    temp['attr']['id'] = obj[prop];
                }
            } else if (prop === 'text') {
                var textChild = {};
                textChild.type = "text";
                textChild.text = obj[prop];
                temp["children"].push(textChild);
            } else {
                // if(obj[prop] instanceof Boolean){
                //     if(obj[prop]){
                //         temp['attr'][prop] = obj[prop];
                //     }
                // }else{
                //     temp['attr'][prop] = obj[prop];
                // }
                if(obj[prop] === true || obj[prop] === false){
                    if(obj[prop]){
                        temp['attr'][prop] = obj[prop];
                    }
                }else{
                    temp['attr'][prop] = obj[prop];
                }
            }
        }


        // temp["attr"]["id"] = id;
        let child_ids = new_json["info"][id]["children"];
        
        for (let i = 0; i < child_ids.length; i++) {
            // if(child_maps[child_ids[i]] === 0)
            temp["children"].push(findChild_json_and_insert(new_json, child_ids[i]));
        }
    }
    else {
        temp["text"] = new_json["info"][id]["cfgData"]["text"];
    }
    return temp;
}


var wxml2json = require("wxml2json").wxml2json;
var json2wxml = require('wxml2json').json2wxml;
var nanoid = require('nanoid');

module.exports.wxml2json = function (wxml) {
    let origin_json = wxml2json(wxml);
    let new_json = generate_json(origin_json);
    let new_new_json = generate_text(new_json);
    // let new_new_json = {};
    // new_new_json["info"] = {};
    // new_new_json["children"] = new Array();
    // console.log(new_json["children"].length);
    // for(let i=0;i<new_json["children"].length;i++){
    //     new_new_json["children"].push(new_json["children"][i]);
    //     if(text_id.indexOf(new_json["children"][i]===-1)){
    //         new_new_json["info"][new_json["children"][i]] = new_json["info"][new_json["children"][i]];
    //     }
    // }
    return new_new_json;
}

module.exports.json2wxml = function (json) {
    let rec_json = recover_json(json);
    let rec_wxml = json2wxml(rec_json);
    return rec_wxml;
}

module.exports.move = function (f_id, t_id, json) {
    remove(f_id, json);
    insert(f_id, t_id, json);
    let rec_json = recover_json(json);
    let rec_wxml = json2wxml(rec_json);
    let t = new Array();
    t.push(json);
    t.push(rec_wxml);
    return t;
}