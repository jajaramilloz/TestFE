//default
import myPackage from './myPackage';
//named
import {favColor, favNum} from './helpers';
//npm
import _lodash from 'lodash';
//old style
const oldPackage = require('something');

//name export/import
//export const name = 'value'
//import { name } from '...'

//default export/import
//export default 'value'
//import anyName from '...'

//Rename export/import
//export { name as newName }
//import { newName } from '...'

//Export List + Rename
//export {
//    name1,
//    name2 as newName2    
//}
//import {
//    name1 as newName1,
//    newName2
//} from '...'
