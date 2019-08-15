import React, {Component} from 'react';
import {Icon, Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';

import {menuList} from '../../config';

const {Item, SubMenu} = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.selectedKey = this.props.location.pathname;
    this.menus = this.createMenu(this.selectedKey);
  };

  createItem = menu => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  createMenu = path => {
    return menuList.map(menu => {
      if (menu.children) {
        return <SubMenu key={menu.key}
                        title={<span>
                          <Icon type={menu.icon}/>
                          <span>{menu.title}</span>
                        </span>}>
          {
            menu.children.map(item => {
              if (item.key === path) {
                this.openKey = menu.key
              }
              return this.createMenu(item)
            })
          }
        </SubMenu>
      } else {
        return this.createMenu(menu);
      }
    })
  };

  render() {
    return <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
      {
        this.menus
      }
    </Menu>;
  }
};

export default withRouter(LeftNav);