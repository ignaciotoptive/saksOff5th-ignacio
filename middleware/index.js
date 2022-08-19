// Register all middleware functions here
import nc from 'next-connect';
import parseMultipartForm from './multipartForm';
import auth from './auth';

const middleware = nc();

// Chain all middleware fns as middleware.use(midd1).use(midd2)...
middleware.use(parseMultipartForm).use(auth);

export default middleware;
