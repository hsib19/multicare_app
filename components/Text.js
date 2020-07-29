import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../constants";

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style // rewrite predefined styles
    ];

    
    const currencyFormat = (num) => {


      let uang = parseFloat(Math.round(num == undefined ? 0 : num));

      return uang.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

    return (
      <Text style={textStyles} {...props}>
        {this.props.uang ? "Rp. "+currencyFormat(this.props.value) : this.props.numeric ? currencyFormat(this.props.value) : children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    fontFamily: 'Poppins-Regular'
  },
  // variations
  regular: {
    fontWeight: "normal",
    fontFamily: 'Poppins-Regular'
  },
  bold: {
    fontWeight: "bold",
    fontFamily: 'Poppins-Bold'
  },
  semibold: {
    fontWeight: "500",
    fontFamily: 'Poppins-Regular'
  },
  medium: {
    fontWeight: "500",
  },
  light: {
    fontWeight: "200",
    fontFamily: 'Poppins-Regular'
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  // colors
  accent: { color: theme.colors.accent },
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  tertiary: { color: theme.colors.tertiary },
  black: { color: theme.colors.black },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small
});