/* MAKINAROCKS CONFIDENTIAL
 * ________________________
 *
 * [2017] - [2021] MakinaRocks Co., Ltd.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of MakinaRocks Co., Ltd. and its suppliers, if any.
 * The intellectual and technical concepts contained herein are
 * proprietary to MakinaRocks Co., Ltd. and its suppliers and may be
 * covered by U.S. and Foreign Patents, patents in process, and
 * are protected by trade secret or copyright law. Dissemination
 * of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained
 * from MakinaRocks Co., Ltd.
 */

import React, { useCallback, useContext, useEffect, useState } from 'react';
import SVGInline from 'react-svg-inline';
import fileDownload from 'file-saver';
import inValidRed from '../../style/icons/pipeline/invalidRed.svg';
import { ExportContext } from '../utils/GlobalDialog';
import Notification from '../utils/notification';
import { useInput } from '../utils/customHook';

interface IProps {
    fileOriginName: string[];
    downloadData: Promise<Blob>;
}

const DownloadFile = (props: IProps): JSX.Element => {
    const reg = new RegExp('^[\\w\\-. ]+$');
    const [fileName, changeFileName, setFileName] = useInput('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [extension, setFileExtension] = useState('');
    const [nameError, setNameError] = useState(false);
    const [fileData, setFileData] = useState(props.downloadData);

    const { onClickHandler, exportType } = useContext(ExportContext);

    useEffect(() => {
        if (props.fileOriginName && props.downloadData) {
            setFileName(props.fileOriginName[0]);
            setFileExtension(props.fileOriginName[1]);
            setFileData(props.downloadData);
        }
    }, [props.fileOriginName, props.downloadData]);

    const downloadFile = useCallback(async () => {
        if (fileData && !nameError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            fileDownload(await fileData, fileName + extension);
            Notification.success('Successfully exported ' + exportType);

            onClickHandler();
        }
    }, [fileName, nameError, fileData]);

    useEffect(() => {
        if (reg.test(fileName.split(extension)[0])) {
            setNameError(false);
        } else {
            setNameError(true);
        }
    }, [fileName, extension]);

    return (
        <div className="download-cache-container">
            <div className="download-cache-info">
                <div className="download-cache-name">
                    <p className="download-file-name">File Name</p>
                    <div className='file-name-container'>
                      <input
                        className="download-cache-name-input"
                        value={fileName}
                        onChange={e => changeFileName(e)}
                      />
                      <p className='extension-info'>{extension}</p>
                    </div>
                    {nameError ? (
                        <div className="error-on-name">
                            <SVGInline svg={inValidRed} />
                            <p>Required</p>
                        </div>
                    ):(
                      <div style={{height: '13px', width: '1px'}}/>
                    )}
                </div>
            </div>
            <div className="download-cancel-container">
                <button
                  className="button-layout white-button"
                    onClick={onClickHandler()}
                >
                    Cancel
                </button>
                <button
                  className="button-layout blue-button"
                  onClick={downloadFile}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadFile;
