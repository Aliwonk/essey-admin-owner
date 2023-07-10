import React from 'react';
import GIFLoader from './LoaderGif.gif';

export default function Loader(props) {
  const { style, styleImg } = props;
  return (
    <div
      style={
        style || {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }
      }
    >
      <img src={GIFLoader} style={styleImg || { width: '100%', height: '100%' }} alt="Загрузка" />
    </div>
  );
}
