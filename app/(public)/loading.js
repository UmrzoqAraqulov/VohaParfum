import { Spin } from 'antd';

const loading = () => {
  return (
    <div className="text-center h-[320px] flex items-center w-full justify-center bg-blac bg-opacity-40 backdrop-blur-md rounded-md containr">
      <Spin size="large"/>
    </div>
  );
}

export default loading