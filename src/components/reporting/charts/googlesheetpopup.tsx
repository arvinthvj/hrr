import React from 'react';
import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { postData } from '../../../services/reportingapicall';

const Googlesheetpopup = props => {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
  };

  const [form] = Form.useForm();

  const getResponse = (data, res) => {
    console.log('getResponse', data);
    // let a = document.createElement('a');
    // document.body.appendChild(a);
    // a.setAttribute('style', 'display: none');
    // a.href = data?.data?.url;
    // a.target = '_blank';
    // a.click();
  };

  const onFinish = async values => {
    props.setModalOpen(false);
    try {
      await postData(
        'api/google/spreadsheet/creation',
        {
          sheet_title: props.charttitle,
          row_header: props?.gsheetdata?.row_header,
          rows: props?.gsheetdata?.rows,
          share_email_id: values.shared_email,
        },
        getResponse,
      );
    } catch (er) {
      console.log('Error :', er);
    }
  };

  const onReset = () => form.resetFields();

  return (
    <>
      <Modal
        title={`Enter shared email`}
        open={props.modalOpen}
        className="reportingemailModal"
        onOk={() => props.setModalOpen(false)}
        onCancel={() => props.setModalOpen(false)}
        footer={null}
        afterClose={onReset}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="sharedemail"
          className="reportingemailForm"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="shared_email"
            style={{
              borderRadius: 5,
            }}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please Enter E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                onReset();
                props.setModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Googlesheetpopup;
