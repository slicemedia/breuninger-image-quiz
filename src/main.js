import Navigo from 'navigo';

import Example from './Components/Example/Example';

const router = new Navigo('/');

router.on('/', () => {
  Example();
});

router.notFound(() => true);

router.resolve();
