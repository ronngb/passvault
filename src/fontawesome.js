import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faPencilAlt,
  faTrash,
  faEye,
  faCopy,
  faExclamationCircle,
  faSlash,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faGlobe,
  faPencilAlt,
  faTrash,
  faEye,
  faCopy,
  faExclamationCircle,
  faSlash
);

export default {
  FontAwesomeIcon,
  FontAwesomeLayers,
};
