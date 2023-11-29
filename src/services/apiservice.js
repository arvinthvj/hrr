import API from './axioservice';

export const postData = url => {
  return new Promise((resolve, reject) => {
    API.post(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getData = url => {
  return new Promise((resolve, reject) => {
    API.get(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postDatawithtoken = (url, data) => {
  return new Promise((resolve, reject) => {
    API.post(url, data, {
      responseType: 'blob'
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getDataWithToken = (url, data) => {
  return new Promise((resolve, reject) => {
    API.get(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
