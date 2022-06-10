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
import styled from '@emotion/styled';

export const GlobalDialogStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  width: 430px;
  border-radius: 10px;

  text-align: center;

  background-color: var(--link-global-dialog-background);
  transform: translate(-50%, -50%);

  .global-dialog-icon-container {
    display: block;
    padding-top: 20px;
  }

  .global-dialog-title-container {
    display: block;
    padding-top: 20px;

    color: var(--link-global-dialog-title-font-color);
    font-weight: 700;
    font-size: 20px;
    text-align: center;

    & > p {
      display: inline-block;
    }
  }
  .global-dialog-body-container {
    display: block;
    padding: 16px 100px 0px 100px;

    color: var(--link-global-dialog-body-font-color);
    font-weight: 400;
    font-size: 13px;
    text-align: center;
  }
  .global-dialog-descriptionTitle-container {
    display: block;
    padding: 24px 0px 0px 30px;

    color: var(--link-global-dialog-description-title-font-color);
    font-weight: 700;
    font-size: 13px;
    text-align: left;
  }
  .global-dialog-descriptionBody-container {
    display: block;
    padding: 5px 30px 0px 30px;
  }

  .global-dialog-descriptionBody-string {
    height: 90px;
    overflow: auto;

    background-color: var(
      --link-global-dialog-description-body-string-background
    );

    & > p {
      padding-left: 10px;

      color: var(--link-global-dialog-description-body-string-font-color);
      text-align: left;
    }
  }
  .global-dialog-descriptionBody-object-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90px;

    background-color: var(
      --link-global-dialog-description-body-object-background
    );
  }
  .global-dialog-descriptionBody-object {
    width: 100%;
    & > .key {
      display: inline-block;
      width: 30%;

      color: var(--link-global-dialog-description-body-object-key-font-color);
      font-weight: bold;
      font-size: 11px;
    }

    & > .value {
      display: inline-block;
      width: 70%;

      color: var(--link-global-dialog-description-body-object-key-value-color);
      font-size: 11px;
    }
    & p {
      padding-left: 12px;

      text-align: left;
    }
  }

  .global-dialog-buttons-container {
    display: flex;
    justify-content: center;
    padding: 28px 30px 30px 30px;
  }
  .global-dialog-button {
    width: 120px;
    height: 40px;
    margin-left: 10px;

    font-weight: 700;
    font-size: 13px;

    cursor: pointer;
  }
  .global-dialog-button-empty {
    border: 1px solid var(--link-global-dialog-button-empty-border-color);

    color: var(--link-global-dialog-button-empty-font-color);

    background-color: var(--link-global-dialog-button-empty-background);
  }
  .global-dialog-button-fill {
    border: 1px solid var(--link-global-dialog-button-fill-border-color);

    color: var(--link-global-dialog-button-fill-font-color);

    background-color: var(--link-global-dialog-button-fill-background);
  }
`;

export const DownloadDialogStyled = styled.div`
  display: block;

  .cache-size-wrapper {
    display: block;
    width: 250px;

    margin: 0 auto;
  }

  .cache-size-info {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    width: 100%;
    height: 43px;
    margin: 30px 0;
    padding: 15px 30px;

    border: 1px solid #e2e1e3;

    background-color: #f5f4f6;

    & > p {
      color: #454555;
      font-weight: bold;
      font-size: 11px;
      font-style: normal;
      line-height: 13px;
    }
  }

  .cache-next-step {
    display: flex;
    justify-content: space-between;
  }
  .download-cancel-container {
    display: block;
    width: 250px;
    margin: 0 auto;

    margin-top: 16px;
    padding-bottom: -16px;

    & > button:last-child {
      margin-left: 10px;
    }
  }
  .button-layout {
    box-sizing: border-box;
    width: 120px;
    height: 39.3px;
    margin-bottom: 30px;
    padding: 0;
    border: 1px solid #6a77d7;

    font-weight: bold;
    font-size: 13px;
    font-style: normal;
    line-height: 15px;

  }

  .white-button {
    color: #6a77d7;

    background: #ffffff;
  }
  .blue-button {

    color: #ffffff;

    background: #6a77d7;
  }

  .progress-container {
    display: block;
    margin-bottom: 30px;

    text-align: center;
  }

  .progress-bar {
    display: inline-block;

    width: 320px;
    height: 10px;

    border-radius: 20px;
  }

  .cache-next-step {
    & > button {
      box-sizing: border-box;
      width: 120px;
      height: 39.3px;
      margin-bottom: 30px;
      padding: 0;
      border: 1px solid #6a77d7;

      color: #6a77d7;
      font-weight: bold;
      font-size: 13px;
      font-style: normal;
      line-height: 15px;

      background: #ffffff;
    }

    & > button:last-child {
      color: #ffffff;

      background: #6a77d7;
    }
  }

  .download-cache-info {
    margin-top: 30px;
  }

  .file-name-container {
    display: flex;
    align-items: center;
  }

  .error-on-name {
    display: flex;
    /* identical to box height */
    height: 13px;
    /* identical to box height */

    color: #FF0000;
    font-weight: normal;
    font-size: 10px;
    font-style: normal;
    line-height: 12px;
  }
  .error-on-name .SVGInline {
    display: flex;
    align-items: center;

  }
  .error-on-name .SVGInline svg {
    width: 12px;
    padding-right: 6px;
  }

  .download-cache-name {
    margin: 0 60px;
  }

  .extension-info {
    margin-left: 13px;

    color: #454555;
    font-weight: bold;
    font-size: 13px;
    font-style: normal;
    line-height: 15px;
  }

  .download-cache-name-input {
    box-sizing: border-box;
    width: 250px;
    height: 30px;

    margin-bottom: 4px;
    padding-top: 9px;
    padding-bottom: 8px;
    padding-left: 12px;
    border: 1px solid #e2e1e3;
    /* identical to box height */

    color: #454555;
    font-weight: normal;
    font-size: 11px;

    font-style: normal;
    line-height: 13px;

    background: #ffffff;
  }

  .download-file-name {
    padding-bottom: 5px;

    color: #6a77d7;
    font-weight: bold;
    font-size: 11px;
    font-style: normal;
    line-height: 13px;
    /* identical to box height */
    text-align: left;
  }

  .download-file-btn {
    width: 60px;
    height: 16px;
    margin-top: 30px;
    margin-bottom: 42px;
    padding: 12px 30px;
    border: 1px solid #6a77d7;

    color: #ffffff;

    background: #6a77d7;
  }
`;
