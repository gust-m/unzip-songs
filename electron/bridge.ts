import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  extractFiles: (
    downloadsFolderPath: string,
    destinationSongsFolderPath: string,
    isOverwriteCheckboxSelected: boolean
  ) => {
    ipcRenderer.send(
      'extract',
      downloadsFolderPath,
      destinationSongsFolderPath,
      isOverwriteCheckboxSelected
    )
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  send: (channel: string, data: any) => {
    console.log('b')
    ipcRenderer.send(channel, data)
  },
}

contextBridge.exposeInMainWorld('Main', api)
