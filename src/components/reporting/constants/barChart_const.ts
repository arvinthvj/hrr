export const yAxisConfigs = {
    'today_attendance_by_location' :{
        softMax: 100,
        endOnTick: true,
      },
      'default' : {
        labels: {
            formatter: function () {
              return this.value + '%';
            },
          },
        max: 100,
      }
}