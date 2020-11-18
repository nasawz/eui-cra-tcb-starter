import { getApp } from '../lib/tcb';
import { config } from '../config';
import { useState } from 'react';
import { htmlIdGenerator } from '@elastic/eui';
const app = getApp();

export function useFile() {
  const [percent, setPercent] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const getExtensionFromFilename = name => name.split('.').pop();
  const renameFile = file => {
    const ext = getExtensionFromFilename(file.name);
    return `${htmlIdGenerator('')()}.${ext}`;
  };

  const uploadFile = (files, cb) => {
    const file = files[0];
    setLoading(true);
    app
      .uploadFile({
        cloudPath: renameFile(file),
        filePath: file,
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setPercent(percentCompleted);
        },
      })
      .then(result => {
        const { fileID } = result;
        app
          .getTempFileURL({
            fileList: [{ fileID, maxAge: 315360000 }],
          })
          .then(res => {
            const { fileList }: any = res;
            cb(null, fileList[0]);
          })
          .catch(e => cb(e));
      })
      .catch(e => cb(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFile = fileID => {
    app.deleteFile({ fileList: [fileID] }).then(res => {});
  };

  return {
    uploadFile,
    deleteFile,
    loading,
  };
}
