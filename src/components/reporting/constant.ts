import moment from "moment";

export * as heatmap from "./constants/heatmap_const";
export * as singleBarchart from "./constants/sigleBarchart_const";

export const defaultTitle = 'HH-Reportcharts';

export const daysofweek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

export const exporting_menuitems = [
    'downloadCSV',
    'downloadPNG',
    'downloadPDF',
    'downloadXLS',
    'googleSheet',
    'separator',
    'printChart',
    'email'
];

export const exportFilename = () => {
    return `hybridhero_chart_${moment(new Date()).format('DDMMYYYYHHmm')}`;
}

export const assetsList = [
    {
        id: 0,
        name: 'Today reports',
        floor_type:4,
    },
    {
        id: 1,
        name: 'Overview',
        floor_type:4,
    },
    {
        id: 2,
        name: 'Workspace Utilization',
        floor_type:1,
    },
    {
        id: 3,
        name: 'Room utilisation',
        floor_type:2,
    },
    {
        id: 4,
        name: 'Parking utilisation',
        floor_type:3,
    },
    {
        id: 5,
        name: 'Health & safety',
        floor_type:0,
    },
    {
        id: 6,
        name: 'Visitor management',
        floor_type:0,
    },
    {
        id: 7,
        name: 'People Operations',
        floor_type:0,
    },
    {
        id: 8,
        name: 'Performance management',
        floor_type:0,
    },
    {
        id: 9,
        name: 'Custom reports',
        floor_type:0,
    },
];

export const locatoinlevel = [
    {
        id: 0,
        name: 'Global',
    },
    {
        id: 1,
        name: 'Region',
    },
    {
        id: 2,
        name: 'Country',
    },
    {
        id: 3,
        name: 'State',
    },
    {
        id: 4,
        name: 'City',
    },
    {
        id: 5,
        name: 'Suburb',
    },
    {
        id: 6,
        name: 'Street',
    },
    {
        id: 7,
        name: 'Building',
    },
    {
        id: 8,
        name: 'Floor',
    },
    {
        id: 9,
        name: 'Zone',
    },
    {
        id: 10,
        name: 'Neighbourhoon',
    },
];


export const REPORTING_CHART_TITLE = {
    headcount_by_employment_status_over_time: "Headcount by employment status over time",
    avg_head_count_by_team: "Average headcount by team",
    avg_head_count_by_location: "Average headcount by location",
    absence_by_reason_over_time: "Absence by reason over time",
    emp_by_length_service: "Employees by length of service",
    emp_status: "Employment status",
    emp_by_age_grp : "Employees by age group",
    emp_by_gender : "Employees by gender"
}

export const reporting_api_call = {
    teamList: 'api/team/list',
}


export const GOOGLE_SHEET_TITLE_FOR_REPORT = {
    employees_by_length_of_service : 'employees_by_length_of_service'
}
export const changePercentageFormula = (previousData: number, currentData: number) => {
    const difference = ((currentData - previousData) / previousData) * 100;
    const roundedPercent = Math.round(100 * difference) / 100;
   let ratio;
    let percentage;
    if (roundedPercent == Infinity) {
      ratio = 'equal';
      percentage = 0;
    } else if (roundedPercent == -Infinity) {
      ratio = 'equal';
      percentage = 0;
    } else if (isNaN(roundedPercent)) {
      ratio = 'equal';
      percentage = 0;
    } else if (roundedPercent === 0) {
      ratio = 'equal';
      percentage = roundedPercent;
    } else if (roundedPercent > 0) {
      ratio = 'up';
      percentage = roundedPercent;
    } else if (roundedPercent < 0) {
      ratio = 'down';
      percentage = roundedPercent;
    } else {
      ratio = 'equal';
      percentage = 0;
    }
    if (percentage == 0) {
      percentage = 0;
    }
    percentage = Math.abs(percentage);
    const isWholeNumber = percentage % 1 === 0;

    // Format the number with two decimal places if it's not a whole number
    const output = isWholeNumber ? percentage.toFixed(0) : percentage.toFixed(2);

    return { percentage: output, ratio: ratio };
  };

  export const groupingOthersMINlen = 7;
  export const groupingOthersMAXlen = 8;
  export const noDataText = 'There is insufficient data to display this graph.';

