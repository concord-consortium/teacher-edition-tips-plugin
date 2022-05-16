/* eslint-disable @typescript-eslint/no-require-imports */
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
/* eslint-enable @typescript-eslint/no-require-imports */

enzyme.configure({ adapter: new Adapter() });
