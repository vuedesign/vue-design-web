import App from './core/app';
import Design from './core/design';
import { injectionTimestamp } from './global/utils';

console.log('Design ================= ', Design);
Design.App = App;

export {
    injectionTimestamp
};
export default Design;
