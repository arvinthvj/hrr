import { postData } from '../../../services/reportingapicall';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { Excel } from 'antd-table-saveas-excel';

export const customXlmethod = data => {
  const excel = new Excel();
  excel.setTHeadStyle({
    background: 'FFFFFFFF',
    borderColor: 'E1E3E1',
    bold: false,
    fontSize: 11,
    fontName: 'Calibri',
  });
  excel.setRowHeight(0.45, 'cm');
  excel.setTBodyStyle({
    bold: false,
    fontSize: 11,
    fontName: 'Calibri',
  });
  excel
    .addSheet(`${data?.title}`)
    .addColumns(data?.columns)
    .addDataSource(data?.rows, {
      str2Percent: true,
    })
    .saveAs(
      `hybridhero_chart_${moment(new Date()).format('DDMMYYYYHHmm')}.xlsx`,
    );
};

export const callgooglesheetApi = data => {
  postData(
    'api/google/spreadsheet/creation',
    {
      sheet_title: `hybridhero_chart_${moment(new Date()).format(
        'DDMMYYYYHHmm',
      )}`,
      tab_title: data?.title,
      row_header: data.row_header,
      rows: data.rows,
      share_email_id: 'inbarasan11@gmail.com',
    },
    null,
    getResponse,
  );
};

const getResponse = (data, res) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.href = data?.data?.url;
  a.target = '_blank';
  a.click();
};
