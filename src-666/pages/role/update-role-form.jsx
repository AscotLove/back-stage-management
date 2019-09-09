import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import PropTypes from 'prop-types';

import {menuList} from '../../config';

const Item = Form.Item;
const {TreeNode} = Tree;



class UpdateRoleForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  };

  treeData = [{
    title: '平台权限', key: '/', children: menuList.map(menu => {
      const data = {
        title: menu.title,
        key: menu.key
      }
      if (menu.children) {
        data.childred = menu.childred.map(cMenu => {
          return {
            title: cMenu.title,
            key: cMenu.key
          }
        })
      }
      return data
    })
  }]


  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });

  render() {
    const {form: {getFieldDecorator}, name} = this.props;

    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'menus',
              {
                rules: [
                  {
                    required: true, message: '请选择角色'
                  }
                ],
                valuePropName: 'checkedKeys',
                trigger: 'onCheck',
                validateTrigger: 'onCheck'
              }
            )(
              <Tree
                checkable
                defaultExpandAll={true}
              >
                {this.renderTreeNodes(this.treeData)}
              </Tree>
            )
          }

        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm);