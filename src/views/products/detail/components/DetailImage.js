/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Dropzone, { defaultClassNames } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import DropzoneColumnPreview from 'components/dropzone/DropzoneColumnPreview';

const DetailImage = ({ urlImage, title }) => {
  const filePaths = React.useMemo(() => [urlImage], [urlImage]);
  const [files, setFiles] = useState([]);

  const loadFile = (path) => {
    return new Promise((resolve, reject) => {
      fetch(path).then((res) => {
        res.arrayBuffer().then((buf) => {
          return resolve(new File([buf], title, { type: 'image/jpeg' }));
        });
      });
    });
  };

  const loadFiles = useCallback(() => {
    const promises = filePaths.map((path) => {
      return loadFile(path);
    });
    Promise.all(promises).then((newFiles) => setFiles(newFiles));
  }, [filePaths]);

  useEffect(() => {
    console.log(files);
    loadFiles();
    return () => setFiles([]);
  }, [loadFiles]);

  // const getUploadParams = () => ({ url: 'https://httpbin.org/post' });

  const onChangeStatus = (fileWithMeta, status) => {
    // console.log(fileWithMeta);
    // console.log(status);
  };

  return (
    <Dropzone
      initialFiles={files}
      // getUploadParams={getUploadParams}
      PreviewComponent={DropzoneColumnPreview}
      submitButtonContent={null}
      accept="image/*"
      submitButtonDisabled
      SubmitButtonComponent={null}
      inputWithFilesContent={null}
      onChangeStatus={onChangeStatus}
      classNames={{
        inputLabelWithFiles: defaultClassNames.inputLabel,
        dropzone: `${defaultClassNames.dropzone} row g-2 row-cols-1`,
      }}
      inputContent="Drop Files"
    />
  );
};

export default DetailImage;
