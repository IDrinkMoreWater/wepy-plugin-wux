import {
    existsSync,
    readFileSync,
    writeFileSync
} from 'fs';
import { join } from 'path';
import copydir from 'copy-dir';

const WUX_PATH = eval("require.resolve('wux-weapp/package.json').replace(/package.json$/, '')");
const WUX_VERISON = eval("require('wux-weapp/package.json').version");

import {
    WUX_SOURCE_DIR,
    TARGET_DIR_NAME,
    VERSION_FILE_NAME
} from './config'

// 复制WUX的文件到src中
const copyWuxToSrc = () => {
    let sourcePath = join(WUX_PATH, WUX_SOURCE_DIR)
    let targetPath = join('src', TARGET_DIR_NAME)
    let versionPath = join('src', TARGET_DIR_NAME, VERSION_FILE_NAME)

    // 检测src目录下的副本
    if (existsSync(targetPath) && existsSync(versionPath)) {
        let copyVersion = readFileSync(versionPath, 'utf-8')
        if (copyVersion === WUX_VERISON) return // 比对版本
    }
    copydir.sync(sourcePath, targetPath) // 复制文件夹
    writeFileSync(versionPath, WUX_VERISON) // 添加版本文件
    addCopyFolderToGitIgnore() // 把复制过去的文件夹添加.gitignore
}

// 添加git忽略
const addCopyFolderToGitIgnore = () => {
    if (!existsSync('.gitignore')) {
        writeFileSync('.gitignore', 'src/' + TARGET_DIR_NAME + '/')
    } else {
        let ignore = readFileSync('.gitignore', 'utf-8')
        if (!ignore.match('src/' + TARGET_DIR_NAME)) {
            ignore += '\nsrc/' + TARGET_DIR_NAME + '/'
            writeFileSync('.gitignore', ignore)
        }
    }
    if (!existsSync('.wepyignore')) {
        writeFileSync('.wepyignore', '/wux')
    } else {
        let ignore = readFileSync('.wepyignore', 'utf-8')
        if (!ignore.match('/wux')) {
            ignore += '\n/wux'
            writeFileSync('.wepyignore', ignore)
        }
    }
}

export default copyWuxToSrc;
