## Middleware ##
----------------

> What are Middlewares?

* Middleware in Node.js refers to a series of functions that have access to the request
object (req), the response object (res), and the next middleware function in the application’s
request-response cycle. These functions can execute various tasks such as modifying request and
response objects, performing authentication, logging, error handling, and more.

[!Middleware image](middleware_image.png)

* Some key functions of middlewares includes:
    - Execute any code.
    - Make changes to the request and the response objects.
    - End the request-response cycle.
    - Call the next middleware function in the stack.

* Basically middleware is a function that runs during a request response cycle!