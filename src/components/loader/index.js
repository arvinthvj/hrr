import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader({ height = '50', width = '50' }) {
  return (
    <ThreeDots
      height={height ? height : '50'}
      width={width ? width : '50'}
      radius="9"
      color="#0F62AB"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}
