import React, { useState, useCallback, useEffect } from 'react'

import { Button, Checkbox, Form, Input } from 'antd'

import { Container, Content } from './styles'

interface ExtractFilesProps {
  downloadsFolderPath: string
  destinationSongsFolderPath: string
}

export const HomeErp: React.FC = () => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [isOverwriteCheckboxSelected, setIsOverwriteCheckboxSelected] =
    useState(false)

  const downloadsFolderPath = localStorage.getItem('@unzipSongs:downloadPath')
  const destinationSongsFolderPath = localStorage.getItem(
    '@unzipSongs:extractPath'
  )

  const handleSubmitExtractFiles = useCallback(
    ({
      downloadsFolderPath,
      destinationSongsFolderPath,
    }: ExtractFilesProps) => {
      try {
        setIsLoading(true)
        console.log(downloadsFolderPath)
        console.log(destinationSongsFolderPath)
        console.log(isOverwriteCheckboxSelected)

        window.Main.extractFiles(
          downloadsFolderPath,
          destinationSongsFolderPath,
          isOverwriteCheckboxSelected
        )

        localStorage.setItem('@unzipSongs:downloadPath', downloadsFolderPath)
        localStorage.setItem(
          '@unzipSongs:extractPath',
          destinationSongsFolderPath
        )

        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)

        console.log(err)
        form.setFields([
          {
            name: 'downloadsFolderPath',
            errors: ['There was an error trying to access this path'],
          },
          {
            name: 'destinationSongsFolderPath',
            errors: ['There was an error trying to access this path'],
          },
        ])
      }
    },
    [form, isOverwriteCheckboxSelected]
  )

  useEffect(() => {
    form.setFieldsValue({
      downloadsFolderPath,
      destinationSongsFolderPath,
    })
  }, [downloadsFolderPath, form, destinationSongsFolderPath])

  return (
    <Container>
      <Content>
        <div>
          <Form
            layout="vertical"
            onFinish={handleSubmitExtractFiles}
            form={form}
          >
            <strong>Unzip Songs</strong>
            <Form.Item
              label="Path Downloads folder"
              name="downloadsFolderPath"
              rules={[
                {
                  required: true,
                  message: 'Insert Path to where your zipped download are',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="C:\Users\YOUR_PC_NAME\Downloads\zippedSongsFolder"
                style={{ width: '500px' }}
                name="downloadsFolderPath"
              />
            </Form.Item>
            <Form.Item
              label="Path Destination Songs folder"
              name="destinationSongsFolderPath"
              rules={[
                {
                  required: true,
                  message: 'Insert Path to ohShape songs folder',
                },
              ]}
            >
              <Input
                size="large"
                name="destinationSongsFolderPath"
                placeholder="C:\Users\YOUR_PC_NAME\Documents\OhShape\Songs"
              />
            </Form.Item>
            <Form.Item name="overwriteExistingFiles">
              <Checkbox
                onChange={event =>
                  setIsOverwriteCheckboxSelected(event.target.checked)
                }
              >
                Overwrite existing files
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{
                background: '#722ED1',
                border: 0,
                height: 40,
                fontSize: '1.25rem',
                marginTop: '1rem',
                width: '500px',
              }}
            >
              Extract
            </Button>
          </Form>
        </div>
      </Content>
    </Container>
  )
}
