/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: wzh
 * @Date: 2019-12-16 19:42:39
 */
import Pluploadjs from 'plupload-es6';

export default function initUploader ({
    browserButton,
    dragdropElement,
    url, // 上传服务器地址
    domain, 
    multiSelection = false,
    maxFileSize = '30mb',
    filters = {},
    params = {},
    multipart_params = {},
    fnFilesAdded = () => { },
    fnBeforeUpload = () => { },
    fnUploadProgress = () => { },
    fnFileUploaded = () => { },
    fnUploadComplete = () => { },
    fnError = () => { },
}) {
    filters.max_file_size = maxFileSize;
    const param = {
        runtimes: 'html5',
        browse_button: browserButton,
        url: `${url}?token=${Utils.getLocal('token')}`,
        multipart_params,
        domain: domain,
        chunk_size: 0,
        unique_names: true,
        multi_selection: multiSelection,
        filters,
        resize:{
            quality:60,
        },
        init: {
            FilesAdded (up, files) {
                let result = fnFilesAdded(up, files);
                // 超过上传限制
                if (result === false) {
                    return false;
                }
                up.fileLength = files.length;
                up.start();
            },
            BeforeUpload (up, file) {
                fnBeforeUpload(up, file);
            },
            UploadProgress (up, file) {
                fnUploadProgress(up, file);
            },
            BeforeChunkUpload(){

            },
            FileUploaded (up, file, info) {
                const res = JSON.parse(info.response);
                up.fileLength -= 1;
                fnFileUploaded(up, file, res);
                if (up.fileLength === 0) {
                    fnUploadComplete(res);
                }
            },
            Error (up, err, errTip) {
                if (err.code === -600) {
                    let max = up.settings.max_file_size || up.settings.filters.max_file_size;
                    errTip = `文件大小不可超过${max.substring(0, max.length - 1).toUpperCase()}`;
                } else if (err.code == -601) {
                    errTip = "文件格式不支持";
                } else {
                    errTip = err.message;
                }
                fnError(up, err, errTip);
            },
        },
    };

    // 是否允许拖拽
    if (dragdropElement) {
        param.dragdrop = true;
        param.drop_element = dragdropElement;
    }
    Utils.extend(param, params);
    const uploader = new Pluploadjs.plupload.Uploader(param);
    uploader.init();
    return uploader;
}