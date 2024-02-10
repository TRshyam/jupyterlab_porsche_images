import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_porsche_images extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_porsche_images:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_porsche_images is activated!');
  }
};

export default plugin;
