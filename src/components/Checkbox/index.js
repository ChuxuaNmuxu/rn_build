// Checkbox 依赖于 Radio组件
// Button 依赖于 Checkbox

import Checkbox from './Checkbox';
import GroupCheckbox from './Group';
import CheckboxButton from './Button';

Checkbox.Group = GroupCheckbox;
Checkbox.Button = CheckboxButton;
export default Checkbox;
