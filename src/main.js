import Bugsnag from '@bugsnag/js';
import BugsnagPerformance from '@bugsnag/browser-performance';

import Navigo from 'navigo';

import Quiz from './Components/Quiz/Quiz';

Bugsnag.start({ apiKey: '4809a9d825d65f3697465869be5b6007' });
BugsnagPerformance.start({ apiKey: '4809a9d825d65f3697465869be5b6007' });

const router = new Navigo('/');

Quiz();

router.notFound(() => true);

router.resolve();
