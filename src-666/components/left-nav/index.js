import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import data from '../../utils/store';

import {menuList} from '../../config';

const {SubMenu, Item} = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props);

    let {pathname} = this.props.location;
    if (pathname.startsWith('/product')) {
      pathname = '/product'
    }
    console.log(data);
    const roleMenus = data.user.role.menus;
    const menus  = this.checkMenus(menuList, roleMenus)
    this.menus = this.createMenu(menus, pathname);
    this.state = {
      selectedKey: ''
    }
  }

  checkMenus = (menuList, roleMenus) => {
    menuList.reduce((prev, curr) => {
      if (roleMenus.include(curr.key)) {
        prev.concat(curr);
      } else if (curr.children) {
        const cMenus = curr.children.filter(cMenu => roleMenus.include(cMenu.key));
        if (cMenus.length) curr.children = cMenus;
        prev.concat(curr)
      }
      return prev;
    },[])
  };
  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);
  }
  createItem = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  };

  createMenu = (menus, path) => {
    return menus.map((menu) => {
      if (menu.children) {
        return <SubMenu
          key={menu.key}
          title={
            <span>
                  <Icon type={menu.icon}/>
                  <span>{menu.title}</span>
                </span>
          }
        >
          {
            menu.children.map((item) => {
              if (item.key === path) {
                this.openKey = menu.key
              }
              return this.createItem(item);
            })
          }
        </SubMenu>
      } else {
        return this.createItem(menu);
      }
    })
  }

  render() {
    return <Menu theme="dark" selectedKeys={[this.state.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
      {
        this.menus
      }
    </Menu>;
  }
}


export default withRouter(LeftNav);