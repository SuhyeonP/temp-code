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

import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  IEnableCommand,
  IPanelCommandArgs,
  IPanelState,
  IPanelVisible
} from '../../../types/interface/panel';
import { CommandIDs } from '../../../commands';
import { dagSelection, widgetManager } from '../../../widget';
import { exportIcon } from '../../../utils/icon';
import { IExportItem } from '../../../types/type/httpTypes';
import { exportPipeline } from '../../../commands/storage/StorageAction';
import { IGraphInfo } from '../../../types/interface';

const initialState: IPanelState = {
  open: {
    openParameters: false,
    openColorPicker: false,
    openSubPanel: false
  },
  parameters: [],
  pipeline: {
    nodes: [],
    links: []
  },
  notebookId: '',
  notebookMeta: {},
  enable: {
    enableExportLink: true,
    enableExportKube: false,
    enableExportCache: false
  }
};

export const addPanelContextMenuThunk = createAsyncThunk(
  'command/export',
  (panelArgs: IPanelCommandArgs, { getState }) => {
    panelArgs.commands.addCommand(CommandIDs.canvasExport, {
      label: 'Export Kubeflow Pipeline (.yaml)',
      isEnabled: () => {
        return Object(getState()).panel.enable.enableExportKube;
      },
      execute: args => {
        if (!panelArgs.tracker.currentWidget) {
          alert('notebook file is empty');
          return;
        }

        exportPipeline(panelArgs.tracker, 'pipeline');
      }
    });
    panelArgs.commands.addCommand(CommandIDs.exportSelection, {
      label: args => {
        if (args.isNode) {
          return dagSelection.selections.size > 0
            ? 'Export Link Components (.json)'
            : 'Export Link Component (.json)';
        } else {
          return 'Export Link Pipeline (.json)';
        }
      },
      icon: args => {
        return args.isNode ? exportIcon : '';
      },
      isEnabled: () => {
        return Object(getState()).panel.enable.enableExportLink;
      },
      execute: async args => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { tracker, app } = panelArgs;
        let exportType = 'selection-pipeline';
        const cellIDs: string[] = [];

        if (!args.isNode) {
          await tracker.currentWidget!.context.save();
          // todo getcellsIDs widgetManager 로 cellIDs 가져오는거 체크한기
          console.log(widgetManager.currentWidget);

          widgetManager.currentWidget?.cells
            .getComponentCellIDs()
            .forEach(id => {
              cellIDs.push(id);
            });
          exportType = 'link-pipeline';
        } else {
          if (dagSelection.selections.size > 0) {
            exportType = exportType + 's';

            for (const value of dagSelection.selections) {
              cellIDs.push(value[0]);
            }
          } else {
            cellIDs.push((args as any).nodeInfo.original.id);
          }
        }
        console.log(cellIDs);
        exportPipeline(tracker, exportType as IExportItem, cellIDs);
      }
    });
    panelArgs.commands.addCommand(CommandIDs.cacheExport, {
      label: 'Export Cache',
      isEnabled: () => {
        return Object(getState()).panel.enable.enableExportCache;
      },
      execute: async args => {
        if (!panelArgs.tracker.currentWidget) {
          alert('notebook file is empty');
          return;
        }
        exportPipeline(panelArgs.tracker, 'cache');
      }
    });
  }
);

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    changeVisible(
      state: IPanelState,
      action: PayloadAction<IPanelVisible>
    ): void {
      state.open = action.payload;
    },
    setPipelines(state: IPanelState, action: PayloadAction<IGraphInfo>): void {
      state.pipeline = action.payload;
    },
    changeEnableCommand(
      state: IPanelState,
      action: PayloadAction<IEnableCommand>
    ): void {
      state.enable = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        addPanelContextMenuThunk.pending,
        (state: Draft<IPanelState>) => {
          state.enable.enableExportLink = false;
          state.enable.enableExportKube = false;
          state.enable.enableExportCache = false;
        }
      )
      .addCase(
        addPanelContextMenuThunk.rejected,
        (state: Draft<IPanelState>) => {
          state.enable.enableExportLink = false;
          state.enable.enableExportKube = false;
          state.enable.enableExportCache = false;
        }
      );
  }
});

export const { changeVisible, setPipelines, changeEnableCommand } =
  panelSlice.actions;

export default panelSlice;
