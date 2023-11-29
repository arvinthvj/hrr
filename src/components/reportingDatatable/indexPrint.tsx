import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
class PrintableDataTable extends Component<{
  title: string;
  dataSource: any;
  columns: any;
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { dataSource, columns, title } = this.props;

    return (
      <>
        <div style={{ padding: 10 }}>
          <h3>{title}</h3>
          <Table
            className={'table table-striped datatable'}
            rowKey={record => record?.uniqId}
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: ['none', 'none'] }}
          />
        </div>
      </>
    );
  }
}

export default PrintableDataTable;
