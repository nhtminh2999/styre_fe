import { SettingOutlined, TableOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

function Sidebar({ name }) {
  return (
    <div className="flex flex-col w-3/12 bg-[#FAFBFC] p-4 pt-8">
      <div className="mb-8">
        <h2 className="text-[14px] font-semibold tracking-[-0.003em] text-[#42526E]">{name}</h2>
        <span className="mt-[3px] text-[#6B778C] text-xs block ">Software project</span>
      </div>
      <Menu
        mode="inline"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontWeight: '600',
          marginBottom: '15px'
        }}
        defaultOpenKeys={['planning']}
        defaultSelectedKeys={['board']}
      >
        <Menu.SubMenu title="Planning" key="planning">
          <Menu.Item icon={<TableOutlined />} key="board" className="font-normal" style={{ padding: '10px' }}>
            Board
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="People" key="people">
          <Menu.Item icon={<TeamOutlined />} key="teammate" className="font-normal" style={{ padding: '10px' }}>
            Teammates
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item icon={<SettingOutlined />} key="settings" className="font-normal" style={{ padding: '10px' }}>
          Project settings
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Sidebar
