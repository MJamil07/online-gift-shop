import Spin from 'antd/es/spin';

export default function Loading() {
  return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
              <Spin size="large">
              </Spin>       
       </div>
  )
}
