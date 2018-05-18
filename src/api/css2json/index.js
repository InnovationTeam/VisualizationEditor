function css2json(path) {
    var fs = require('fs')
    var css = require('css')

    if(!fs.existsSync(path))
        return []

    var code = fs.readFileSync(path, {encoding: 'utf-8'})
    var str = code.toString()
    var ast = css.parse(str, { source: path })

    console.log(ast)
    let parsedCSS = []

    var ruleslength = ast.stylesheet.rules.length
    let temp = {}
    for (var i = 0; i < ruleslength; i++) {
        if (ast.stylesheet.rules[i].type == 'rule') {
            temp = {
                selector: ast.stylesheet.rules[i].selectors['0'],
                protos: []
            }
            var rulelength = ast.stylesheet.rules[i].declarations.length
            for (var j = 0; j < rulelength; j++) {
                temp.protos.push(
                    {
                        property: ast.stylesheet.rules[i].declarations[j].property,
                        value: ast.stylesheet.rules[i].declarations[j].value
                    }
                )
            }
        }
        else if (ast.stylesheet.rules[i].type == 'comment') {
            temp = {
                selector: 'type-comment',
                protos: [{
                    property: 'comment',
                    value: ast.stylesheet.rules[i].comment
                }]
            }
        }
        else if (ast.stylesheet.rules[i].hasOwnProperty('declarations')) {
            temp = {
                selector: '@' + ast.stylesheet.rules[i].type,
                protos: []
            }
            rulelength = ast.stylesheet.rules[i].declarations.length;
            for (var j = 0; j < rulelength; j++) {
                temp.protos.push({
                    property: ast.stylesheet.rules[i].declarations[j].property,
                    value: ast.stylesheet.rules[i].declarations[j].value
                })
            }
        }
        parsedCSS.push(temp)
    }
    return parsedCSS
}

function save(arr, path) {
    var result = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].selector == 'type-comment') {
            result += '/*' + (arr[i].protos)[0].value + '*/' + '\n'
        }
        else {
            result += arr[i].selector + "\n{\n"
            for (var j = 0; j < arr[i].protos.length; j++) {
                result += '\t' + (arr[i].protos)[j].property + ":" + (arr[i].protos)[j].value
                result += ";\n"
            }
            result += "}\n"
        }
    }
    console.log(result)
    var fs = require("fs")
    var npath = require('path')
    // var csspath = npath.dirname(path) + '\\cache' + '\\' + npath.basename(path).split('.')[0] + '.css'
    // var csspath = npath.dirname(path) + '\\cache' + '\\' + 'cache.css'
    var csspath = '.\\static\\cache.css'

    fs.writeFileSync(path, result)

    result = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].selector == 'type-comment') {
            result += '/*' + (arr[i].protos)[0].value + '*/' + '\n'
        }
        else {
            if(arr[i].selector.split('')[0]=='@') {
                result+=arr[i].selector+"\n{\n"
            }
            else {
                result+='#phone-content '+arr[i].selector+"\n{\n"
            }
            for (var j = 0; j < arr[i].protos.length; j++) {
                result += '\t' + (arr[i].protos)[j].property + ":" + (arr[i].protos)[j].value
                    result += ";\n"
            }
            result += "}\n"
        }
    }
    fs.writeFileSync(csspath, result)
}

export default {
    css2json,
    save
}