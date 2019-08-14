import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu } from 'antd';

import { menuList } from '../../config';

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
  createItem = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  createMenu = (path) => {
    return menuList.map((menu) => {
      if (menu.children) {
        return <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}>
          {
            menu.children.map((item) => {
              if (path === item.key) {
                this.openKey = menu.key;
              }
              return this.createItem(item);
            })
          }
        </SubMenu>
      } else {
        return this.createItem(menu);
      }
    })
  };
  render() {
    const path = this.props.location.pathname;
    const menus = this.createMenu(path);
    return <Menu theme="dark" defaultSelectedKeys={[path]} defaultOpenKeys={[this.openKey]} mode="inline">
      {
        menus
      }
    </Menu>
  }
}

export default withRouter(LeftNav);