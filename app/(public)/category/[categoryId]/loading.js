import { Spin } from "antd"

const loading = () => {
  return (
    <div className="w-full flex justify-center">
      <Spin />
    </div>
  )
}

export default loading