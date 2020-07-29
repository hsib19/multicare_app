import React, { Component } from 'react';
import { View, Text,Image, TouchableOpacity  } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon } from 'react-native-elements';
 
export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
  };
  option4Click = () => {
    this._menu.hide();
    this.props.option4Click();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
                    <Icon name="dots-vertical" iconStyle={{ marginRight: 0 }} type="material-community" />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option2Click}> Setting</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.option4Click}>
            Logout
          </MenuItem>
        </Menu>
      </View>
    );
  }
}