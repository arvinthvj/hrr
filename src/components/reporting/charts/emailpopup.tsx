import React from 'react';
import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { postData } from '../../../services/reportingapicall';
import Toaster from '../../toast';
import moment from 'moment';
import { sendExcelApi, sendMailApi } from '../../../services/apiurl';

const Emailpopup = props => {
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

  const onFinish = values => {
    props.setModalOpen(false);
    try {
      if (props.chart) {
        let b64 = '';
        b64 = props?.printData;
        postData(`${sendMailApi}`, {
          base64String: b64,
          to: values.email,
          subject: props.charttitle,
          fileName: `hybridhero_chart_${moment(new Date()).format(
            'DDMMYYYYHHmm',
          )}.pdf`,
        })
          .then(response => {
            Toaster(response?.data?.status, response?.data?.message);
          })
          .catch(err => {
            console.log('err', err);
            Toaster('', 'Something went wrong');
          });
      } else {
        let data = {};
        data = { ...props.filterdata };
        data['to'] = values.email;
        data['subject'] = props.charttitle;
        postData(`${sendExcelApi}`, data)
          .then(response => {
            Toaster(response?.data?.status, response?.data?.message);
          })
          .catch(err => {
            console.log('err', err);
            Toaster('', 'Something went wrong');
          });
      }
    } catch (er) {
      console.log('Error :', er);
      Toaster('', 'Something went wrong');
    }
  };

  const onReset = () => form.resetFields();

  return (
    <>
      <Modal
        title={`Enter recipient email`}
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
          name="register"
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
            name="email"
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
                message: 'Please Enter Recipient E-mail!',
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
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Emailpopup;
