import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import axios from 'axios';

/**
 * Activate the JupyterLab extension.
 */
function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  restorer: ILayoutRestorer | null
) {
  console.log('JupyterLab extension is activated!');

  // Add a command to fetch and display a random Porsche image
  const command = 'porsche:random-image';
  app.commands.addCommand(command, {
    label: 'Random Porsche Image',
    execute: async () => {
      try {
        await app.serviceManager.terminals.ready;

        const response = await axios.get(
          'https://source.unsplash.com/featured/?porsche'
        );

        const imageUrl = response.request.res.responseUrl;
        const content = `![Porsche Image](${imageUrl})`;

        app.commands.execute('filebrowser:open-path', {
          path: 'Untitled.ipynb',
          factory: 'notebook',
          kernel: 'python', // You can set a default kernel or leave it undefined
          kernelPreference: {
            shouldStart: true,
            canStart: true,
            autoStartDefault: true,
            id: 'python',
            name: 'Python 3',
            language: 'python'
          },
          context: {
            type: 'file',
            path: 'Untitled.ipynb'
          }
        });

        app.commands.execute('notebook:change-cell-to-markdown');
        app.commands.execute('notebook:run-cell-and-insert-below', {
          insertMode: 'below',
          preserveMode: 'auto',
          forceMove: false,
          code: content
        });
      } catch (error) {
        console.error('Error fetching Porsche image:', error);
      }
    }
  });


  // Add the command to the palette
  palette.addItem({
    command,
    category: 'Porsche Images'
  });
}

/**
 * Initialization data for the jupyterlab_porsche_images extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_porsche_images:plugin',
  autoStart: true,
  activate: activate
};

export default extension;
