import oopy from './copy'
import cut from './cut'
import find from './find'
import paste from './paste'
import redo from './redo'
import replace from './replace'
import undo from './undo'

export default{
    copy:copy.copy,
    cut:cut.cut,
    find:find.find,
    findAll:find.findAll,
    paste:paste.paste,
    redo:redo.redo,
    replace:replace.replace,
    replaceAll:replace.replaceAll,
    undo:undo.undo
}