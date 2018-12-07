import { TARGET_DIR_NAME } from './config';

const getPageFilter = (pagePath, fileType) => {
    let pagePaths = typeof pagePath === 'string' ? [pagePath] : pagePath
    let regs = []
    pagePaths.forEach(path => {
        regs.push(path + '([\\/]|[\\\\]).*' + fileType + '$')  // eslint-disable-line
    })
    return new RegExp(regs.join('|'))
}


const getWuxFilter = (fileType, targetPath = TARGET_DIR_NAME) => {
    return new RegExp(`${targetPath}([\\/]|[\\\\]).*\\.${fileType}$`)
}

//page filter
const getPageConfigFilter = (pagePath) => getPageFilter(pagePath, 'json')

// wux filter
const getWuxWxssFilter = () => getWuxFilter('wxss')
const getWuxWxmlFilter = () => getWuxFilter('wxml')

const RPX_RELATIVE = 750;

const getPixelUnitMultiple = (unit, relative) => {
    var result = {
        rpx: RPX_RELATIVE / relative,
        rem: 1 / relative,
        em: 1 / relative,
        px: 1 / relative
    }
    return result[unit] || 1;
}

export {
    getWuxWxssFilter,
    getPageConfigFilter,
    getWuxWxmlFilter,
    getPixelUnitMultiple
}

export default {
    getWuxWxssFilter,
    getPageConfigFilter,
    getWuxWxmlFilter,
    getPixelUnitMultiple
}
