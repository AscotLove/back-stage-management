import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';


const { Item } = Form;
class UpdateCategoryNameForm extends Component {
static propTypes = {
  category: PropTypes.object.isRequired,
};
  validator = (rule, value, callback) => {
    if (!name) {
      callback('请输入修改的分类名称');
    } else if (value === this.props.category)
  }
  render() {
    const { form: { getFieldDecorator }, category: { name }} = this.props;
    return <Form>
      <Item>
        {
          getFieldDecorator(
            'categoryName',
            {
initialvalue: name,
              rules: [
                { validator: this.validator }
              ]
            }
          )(
            <Input/>
          )
        }
      </Item>
    </Form>
  }
}


export default Form.create()(UpdateCategoryNameForm)