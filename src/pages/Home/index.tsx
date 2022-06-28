import React, { useState, useCallback } from 'react'

import { Button, Checkbox, Form, Input } from 'antd'

import { Container, Content } from './styles'

interface ExtractFilesProps {
  downloadsFolderPath: string
  ohShapeSongsFolderPath: string
}

export const HomeErp: React.FC = () => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [isOverwriteCheckboxSelected, setIsOverwriteCheckboxSelected] =
    useState(false)

  const downloadsFolderPath = localStorage.getItem('@unzipSongs:downloadPath')
  const ohShapeSongsFolderPath = localStorage.getItem('@unzipSongs:extractPath')

  const handleSubmitExtractFiles = useCallback(
    ({ downloadsFolderPath, ohShapeSongsFolderPath }: ExtractFilesProps) => {
      try {
        setIsLoading(true)
        console.log(downloadsFolderPath)
        console.log(ohShapeSongsFolderPath)
        console.log(isOverwriteCheckboxSelected)

        window.Main.extractFiles(
          downloadsFolderPath,
          ohShapeSongsFolderPath,
          isOverwriteCheckboxSelected
        )

        localStorage.setItem('@unzipSongs:downloadPath', downloadsFolderPath)
        localStorage.setItem('@unzipSongs:extractPath', ohShapeSongsFolderPath)

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
            name: 'ohShapeSongsFolderPath',
            errors: ['There was an error trying to access this path'],
          },
        ])
      }
    },
    [form, isOverwriteCheckboxSelected]
  )

  form.setFieldsValue({
    downloadsFolderPath,
    ohShapeSongsFolderPath,
  })

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
              label="Path OhShape Songs folder"
              name="ohShapeSongsFolderPath"
              rules={[
                {
                  required: true,
                  message: 'Insert Path to ohShape songs folder',
                },
              ]}
            >
              <Input
                size="large"
                name="ohShapeSongsFolderPath"
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
