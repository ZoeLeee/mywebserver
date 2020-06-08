import { message } from 'antd';

export const beforeUpload = (file) => {
  const isImageFormat = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
  if (!isImageFormat) {
    message.error('You can only upload JPG or PNG or GIF image!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isImageFormat && isLt2M;
};