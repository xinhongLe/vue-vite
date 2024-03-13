import { getOssUrl, ossHelper, ossUpload } from 'lyx-lib'

export interface ossProps {
    Bucket: string
    Extention: string
    FileName: string
    FilePath: string
}

ossHelper.configs = [
    ...ossHelper.configs,
    {
        bucket: 'psychologyfile',
        region: 'oss-cn-shanghai'
    }
]

export const getUrl = (key: string) => {
    return getOssUrl(key)
}

export const uploadFile = (file: File & Blob) => {
    const ossPath = 'Psychology'
    return ossUpload(file, ossPath)
}
