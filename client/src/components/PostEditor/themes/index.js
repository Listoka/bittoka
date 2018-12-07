import buttonStyles from './buttonStyles.module.css'
import blockTypeSelectStyles from './blockTypeSelectStyles.module.css'
import inlineToolbarStyles from './inlineToolbarStyles.module.css'
import inlineSeparatorStyles from './inlineSeparatorStyles.module.css'
import sideToolbarStyles from './sideToolbarStyles.module.css'
import linkTheme from './linkStyles.module.css'
import editorTheme from './editorStyles.module.css'

export const inlineToolbarTheme = {
  buttonStyles,
  toolbarStyles: inlineToolbarStyles,
  separatorStyles: inlineSeparatorStyles // this doesn't seem to work...
}

export const sideToolbarTheme = {
  buttonStyles,
  blockTypeSelectStyles,
  toolbarStyles: sideToolbarStyles,
}

export { linkTheme, editorTheme }