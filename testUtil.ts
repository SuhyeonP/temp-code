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

/* eslint-disable no-constant-condition */

import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { JupyterFrontEnd } from '@jupyterlab/application';
import { CommandRegistry } from '@lumino/commands';
import DeepClone from '../../tracker/util/DeepClone';
import { ICellCanvasMeta } from '../../tracker/CellWidget';
import { IPipeLineInfo } from '../../types/httpTypes';
import { CommandIDs } from '../../commands';
import Notification from '../../utils/notification';
import GlobalDialog from '../common/GlobalDialog';

export interface IGlobalParameter {
  name: string;
  value: any;
  type: string;
}

interface IImportResult {
  component_id: string;
  component_name: string;
  component_type: string;
  cell_code: string;
  predefined: any;
  parents_name?: string[];
}

export const getBasicInfo = (
  tracker: INotebookTracker
): { widget: NotebookPanel | null; cells: any; notebook: any } => {
  return {
    widget: tracker.currentWidget,
    cells: tracker.currentWidget!.context.model.cells.iter(),
    notebook: tracker.currentWidget!.content
  };
};

export const getMetaData = (data: any) => {
  return data.metadata.get('canvas');
};

export const getCellsData = (cells: any) => {
  const index = cells._index;
  const cellsArray = cells._source;
  const cell = cellsArray[index - 1];
  return { index, cellsArray, cell, canvas: getMetaData(cell) };
};

export const getDeepCloneMetaData = (data: any) => {
  return DeepClone<ICellCanvasMeta>(
    getMetaData(data) as unknown as ICellCanvasMeta
  );
};

export const getCellsMetadata = (app: JupyterFrontEnd) => {
  const cells: any = (
    app.shell.currentWidget as NotebookPanel
  ).model?.cells.iter();

  return {
    cells,
    metas: cells._source.map((cell: any) => cell.metadata._map.get('canvas'))
  };
};

/**
 * @author psh, hong, shk
 * @param tracker
 */
export const getLayout = (tracker: INotebookTracker) => {
  const { cells } = getBasicInfo(tracker);
  const cellInfo: any = [];
  const copied: any = [];

  /**
   * ??????????????? ?????? parent.id ????????? ?????? ??????
   */
  const getCopiedCells = () => {
    const { cells } = getBasicInfo(tracker);

    while (true) {
      const next = cells?.next();

      if (next) {
        const canvas = getDeepCloneMetaData(next);

        if (canvas && canvas.isComponent) {
          if (canvas.copiedOriginId) {
            canvas.parents.forEach(parent => {
              const iter = getBasicInfo(tracker).cells;

              while (true) {
                const n = iter?.next();

                if (n) {
                  const meta = getMetaData(n) as unknown as ICellCanvasMeta;

                  if (!meta.copiedOriginId) {
                    continue;
                  }
                  if (meta && meta.copiedOriginId === parent.id) {
                    parent.id = meta.id;
                    parent.name = meta.name;
                  }
                } else {
                  break;
                }
              }
            });
            copied.push({ cell: next, metadata: canvas });
          }
        }
      } else {
        break;
      }
    }
  };

  getCopiedCells();

  /**
   * ?????? ?????? ???????????? ????????? ??????
   */

  while (true) {
    const next = cells?.next();

    if (next) {
      const { canvas, cell } = getCellsData(cells);
      if (canvas && canvas.isComponent && !canvas.copiedOriginId) {
        const splitData: string[] = cell.value.text.split('\n');
        const temp: IPipeLineInfo = {
          id: canvas.id,
          name: canvas.name,
          componentType: canvas.componentType,
          preDefined: canvas.preDefined,
          code_array: splitData,
          code: cell.value.text,
          parents: canvas.parent || [],
          cell,
          headerColor: canvas.headerColor
        };

        cellInfo.push(temp);
      }
    } else {
      break;
    }
  }

  /**
   * copied ?????? ??????????????? ????????? ???????????? ????????????.
   */

  copied.forEach((data: any) => {
    const metadata = data.metadata as ICellCanvasMeta;
    metadata.parents.forEach(parent => {
      const result = copied.filter((copy: any) => {
        const metadata = copy.metadata as ICellCanvasMeta;
        return metadata.id === parent.id;
      });

      if (!result.length) {
        parent.id = '';
      }
    });

    /**
     * ?????? ?????? ????????? + ?????? ???????????? ????????? ??????
     */

    return cellInfo.concat(
      copied.map((data: any) => {
        const splitData: string[] = data.cell.value.text.split('\n');
        const { id, name, componentType, preDefined, parents, headerColor } =
          getMetaData(data) as unknown as ICellCanvasMeta;

        return {
          id,
          name,
          componentType,
          preDefined,
          code_array: splitData,
          code: data.cell.value.text,
          parents: parents || [],
          cell: data.cell,
          headerColor
        };
      })
    );
  });
};

/**
 * id ??? ???????????? metaData ??? node ??? ????????????.
 * node ????????? ?????? codeCell ??? ???????????? ?????? ??????
 * @author psh
 * @param tracker
 * @param id
 */
export const originCellData = (
  tracker: INotebookTracker,
  id: string
): Record<string, any> => {
  const { cells } = getBasicInfo(tracker);
  const cellData: Record<string, any> = {
    meta: null,
    node: null
  };

  while (true) {
    const next = cells?.next();
    if (!next) {
      break;
    }
    const { canvas, index } = getCellsData(cells);

    if (canvas) {
      if (canvas.id === id) {
        cellData.meta = canvas;
        cellData.node = tracker.currentWidget!.node.children[2].children[index];
        break;
      }
    }
  }
  return cellData;
};

/**
 * @author shk
 * @param tracker
 * @param id
 */
export const getCell = (
  tracker: INotebookTracker,
  id: string
): Record<string, any> => {
  const { cells } = getBasicInfo(tracker);
  const cellInfo: Record<string, any> = {
    idx: -1,
    cell: null
  };

  while (true) {
    const next = cells?.next();

    if (!next) {
      break;
    }
    const { canvas, index, cell } = getCellsData(cells);
    if (canvas && canvas.id === id) {
      cellInfo.idx = index;
      cellInfo.cell = cell;
      break;
    }
  }
  return cellInfo;
};

/**
 * currentWidget ??? ?????? cell ?????? ID
 * @param tracker
 * @param app
 */
export const getCellsID = (
  tracker: INotebookTracker,
  app: JupyterFrontEnd
): string[] => {
  const { widget, cells } = getBasicInfo(tracker);

  if (widget) {
    app.shell.activateById(widget.id);
  }

  const { cellsArray } = getCellsData(cells);

  const cellsIDs: string[] = cellsArray.map((cell: any) => {
    if (getMetaData(cell).isComponent) {
      return cell.id;
    } else {
      return;
    }
  });

  return cellsIDs.filter(cellID => cellID);
};

/**
 * pipeline all clear
 * @author psh
 * @param tracker
 * @param commands
 */
export const clearPipeline = (
  tracker: INotebookTracker,
  commands: CommandRegistry
): void => {
  const { cells } = getBasicInfo(tracker);

  while (true) {
    const next = cells.next();

    if (!next) {
      break;
    }
    const deepCopied = getDeepCloneMetaData(next);
    deepCopied.isComponent = false;
    next.metadata.set('canvas', deepCopied);
  }
  commands.execute(CommandIDs.dagUpdate);
};

/**
 * remove selection pipeline
 * @author psh
 * @param tracker
 * @param commands
 * @param ids
 */
export const removePipeline = (
  tracker: INotebookTracker,
  commands: CommandRegistry,
  ids: string[]
): void => {
  const { cells } = getBasicInfo(tracker);

  while (true) {
    const next = cells.next();

    if (!next) {
      break;
    }

    const deepCopied = getDeepCloneMetaData(next);
    if (ids.indexOf(deepCopied.id) !== -1) {
      deepCopied.isComponent = false;
    }
    next.metadata.set('canvas', deepCopied);
  }
  commands.execute(CommandIDs.dagUpdate);
};

/**
 * notebook path ??? deps ??? ?????? ?????? ??????, ?????????????????? notebook name ??? ??????
 * @author huunhoon
 * @param tracker
 * @param isPath
 */
export const getWidgetNotebook = (
  tracker: INotebookTracker,
  isPath: boolean
): string | undefined => {
  const { widget } = getBasicInfo(tracker);
  const { path, name } = widget!.sessionContext;

  return isPath ? path : name;
};

/**
 * ?????? notebooktemplate ??? ????????? ??????????????? ???????????? ??????
 * @author psh
 * @param tracker
 * @param commands
 */
export const pushTemplate = (
  tracker: INotebookTracker,
  commands: CommandRegistry
): void => {
  tracker.currentWidget?.context.ready.then(() => {
    tracker.currentWidget?.model?.metadata.delete('already');
    tracker.currentWidget?.model?.metadata.set('already', true);
  });

  if (tracker.currentWidget) {
    addTemplateCell(tracker.currentWidget.content, []);
    commands.execute('notebook:run-all-cells');
  }
};

interface INotebookTemplate {
  type: string;
  code: string;
}

/**
 * ????????? template ??? ?????????
 * @param notebook
 * @param insert
 */
const addTemplateCell = (notebook: any, insert: INotebookTemplate[]) => {
  const { model } = notebook;

  insert.forEach((template, index) => {
    const cell = model.contentFactory.createCell(template.type, {});
    cell.value.text = template.code;
    model.cells.insert(index, cell);
    notebook.activeCellIndex++;
    notebook.mode = 'edit';
  });
};

/**
 * @author borishim
 * @param app
 * @param tracker
 * @param commands
 * @param inputCacheText
 */
export const pushMagicCache = async (
  app: JupyterFrontEnd,
  tracker: INotebookTracker,
  commands: CommandRegistry,
  inputCacheText: string
) => {
  const { widget } = getBasicInfo(tracker);

  if (widget) {
    const kernel = await widget.sessionContext.session?.kernel;
    const code = `%canvas_cache -s ${inputCacheText}`;
    kernel?.requestExecute({ code, store_history: false }, false, {});
    Notification.success('Successfully imported cache');
  }
};

// todo rename function name
/**
 * @author psh
 * @param app
 * @param tracker
 */
export const getCellIdxPdc = (
  app: JupyterFrontEnd,
  tracker: INotebookTracker
) => {
  const { notebook } = getBasicInfo(tracker);
  const { model } = notebook;

  const currentCellIds: string[] = [];
  const iter = model.cells.iter();
  while (true) {
    const next = iter.next();
    if (!next) {
      break;
    }
    currentCellIds.push(next.sharedModel.getMetadata()['canvas']['id']);
  }

  return currentCellIds as string[];
};

/**
 * import ??? cell?????? widget ??? ?????? ??????
 * @param app
 * @param tracker
 * @param commands
 * @param importArray
 */
export const pushImportCell = (
  app: JupyterFrontEnd,
  tracker: INotebookTracker,
  commands: CommandRegistry,
  importArray: any
) => {
  const { widget, notebook } = getBasicInfo(tracker);
  if (widget) {
    const { model } = notebook;

    const currentCellIds = getCellIdxPdc(app, tracker);

    notebook.activeCellIndex = model.cells.length;
    const startCellIdx = model.cells.length;

    const importedCells: any = [];

    const canvasMetaData = getMetaData(model) || { parameters: [] as any };
    const pipelineParameters = canvasMetaData['parameters'] || ([] as any);

    const globalParams =
      importArray.find(
        (imported: any) => imported.component_type === 'PipelineParameters'
      )?.predefined || [];

    // todo overwrite ??????
    let mergeParams = true;

    const importedParamsName = globalParams.map(
      (param: Record<string, any>) => param.name
    );
    const originParamsName = pipelineParameters.map(
      (param: Record<string, any>) => param.name
    );

    let duplicatedParams = importedParamsName.concat(originParamsName).sort();
    duplicatedParams = duplicatedParams.filter(
      (param: string, idx: number) => param === duplicatedParams[idx + 1]
    );

    if (duplicatedParams.length > 0) {
      new GlobalDialog({
        type: 'warning',
        title: 'Pipeline Parameters Conflict',
        body: 'There are already pipeline parameters with the same name in this file. Are you sure to overwrite?',
        descriptionTitle: `${duplicatedParams.length} duplicated`,
        descriptionBody: duplicatedParams.join(', '),
        buttons: [
          {
            type: 'empty',
            label: 'Cancel',
            func: () => {
              mergeParams = false;
            }
          },
          {
            type: 'fill',
            label: 'Overwrite',
            func: () => {
              mergeParams = true;
            }
          }
        ]
      });
    }

    if (mergeParams) {
      const uniqueParameters = globalParams
        .concat(pipelineParameters)
        .reduce((prev: IGlobalParameter[], now: IGlobalParameter) => {
          if (!prev.some(param => param.name === now.name)) {
            prev.push(now);
          }
          return prev;
        }, []);
      Object.assign(canvasMetaData, {
        parameters: [...uniqueParameters]
      });
      model.metadata.delete('canvas');
      model.metadata.set('canvas', canvasMetaData);

      commands.execute(
        CommandIDs.dagParameters,
        uniqueParameters.map((data: any) => {
          return { name: data.name, value: data.value };
        })
      );
    } else {
      return;
    }

    importArray.forEach((imported: IImportResult) => {
      if (imported.component_type === 'PipelineParameters') {
        return;
      }

      const newCellIndex = model.cells.length;
      const newCell = model.contentFactory.createCell('code', {});
      newCell.value.text = imported.cell_code;
      newCell.sharedModel.setMetadata({
        canvas: {
          name: imported.component_name,
          parents: [],
          isComponent: true,
          componentType: imported.component_type,
          id: null,
          meta_id: newCell.id,
          preDefined: imported.predefined
        }
      });
      model.cells.insert(newCellIndex, newCell);

      const cell = model.cells.get(newCellIndex);
      const metadata = cell.sharedModel.getMetadata();

      // todo duplicated components import ????????????
      if (!currentCellIds.find(cellId => cellId === imported.component_id)) {
        metadata['canvas']['id'] = imported.component_id;
        cell.sharedModel.setMetadata(metadata);
        model.cells.set(newCellIndex, cell);
      }

      importedCells.push({
        id: metadata['canvas']['id'],
        name: imported.component_name
      });
    });

    const { metas } = getCellsMetadata(app);
    notebook.activeCellIndex = startCellIdx;

    importArray.forEach((imported: IImportResult) => {
      if (imported.component_type === 'PipelineParameters') {
        return;
      }

      const cell = model.cells.get(notebook.activeCellIndex);
      const parents = imported.parents_name
        ? checkParents(imported.parents_name, importedCells, metas)
        : [];

      const metadata = cell.sharedModel.getMetadata();
      metadata['canvas']['parents'] = parents;
      cell.sharedModel.setMetadata(metadata);
      model.cells.set(notebook.activeCellIndex++, cell);
    });

    notebook.mode = 'edit';
    commands.execute(CommandIDs.dagUpdate);
    Notification.success('Successfully imported pipeline');
  }
};

export const checkParents = (
  parents: string[],
  importedCellsInfo: any[],
  currentCellsInfo: any[]
) => {
  return parents.map(parent => {
    const id = importedCellsInfo.filter((cell: any) => cell.name === parent)[0]
      .id;

    return {
      name: currentCellsInfo.filter((cell: any) => cell.id === id)[0].name,
      id
    };
  });
};

export const getDateFormat = (date: Date) => {
  const month = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ];

  return `${month[date.getMonth()]} ${
    date.getDate().toString().length <= 1
      ? '0' + date.getDate().toString()
      : date.getDate().toString()
  }, ${date.getFullYear()}`;
};

export const getFileNameExtension = (fileName: string): string[] => {
  return [
    fileName.substring(0, fileName.indexOf('.')),
    fileName.substring(fileName.indexOf('.'), fileName.length)
  ];
};
