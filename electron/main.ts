import { app, BrowserWindow, ipcMain } from 'electron'

import path from 'path'
import fs from 'fs'

import StreamZip from 'node-stream-zip'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

const extractFiles = (
  downloadZipsFolder: string,
  extractedFilesFolder: string,
  isOverwriteCheckboxSelected: boolean
) => {
  const formattedDownloadZipsFolder = downloadZipsFolder.replace(/\\\\/g, '\\')
  const formattedExtractedFilesFolder = extractedFilesFolder.replace(
    /\\\\/g,
    '\\'
  )
  const folderNames = fs
    .readdirSync(formattedExtractedFilesFolder)
    .map(file => file)

  fs.readdirSync(formattedDownloadZipsFolder).forEach(file => {
    const acceptedExtensions = ['.zip']

    const isZippedFile = acceptedExtensions.includes(path.extname(file))

    if (!isZippedFile) {
      return
    }

    const zip = new StreamZip({
      file: path.join(formattedDownloadZipsFolder, file),
      storeEntries: true,
    })

    zip.on('ready', () => {
      const isDirectory = Object.values(zip.entries())[0].isDirectory
      const folderName = Object.values(zip.entries())[0].name.split('.')[0]

      if (!folderNames.includes(folderName) || isOverwriteCheckboxSelected) {
        if (folderNames.includes(folderName) && isOverwriteCheckboxSelected) {
          fs.rmSync(path.join(formattedExtractedFilesFolder, folderName), {
            recursive: true,
            force: true,
          })
        }

        if (!isDirectory) {
          fs.mkdir(
            path.join(formattedExtractedFilesFolder, folderName),
            err => {
              err
                ? console.log(err)
                : console.log(`folder created: ${folderName}`)
            }
          )
        }
      }

      if (!isDirectory) {
        new Promise(() => {
          zip.extract(
            null,
            path.join(formattedExtractedFilesFolder, folderName),
            err => {
              err ? console.log('err', err) : console.log('extracted')
            }
          )
        }).then(() => zip.close())
      } else {
        new Promise(() => {
          zip.extract(null, formattedExtractedFilesFolder, err => {
            err ? console.log('err', err) : console.log('extracted')
          })
        }).then(() => zip.close())
      }
    })
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  // mainWindow.removeMenu()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log('mess', message)
  })

  ipcMain.on(
    'extract',
    (
      _,
      downloadsFolderPath: string,
      ohShapeSongsFolderPath: string,
      isOverwriteCheckboxSelected: boolean
    ) => {
      extractFiles(
        downloadsFolderPath,
        ohShapeSongsFolderPath,
        isOverwriteCheckboxSelected
      )
    }
  )
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
