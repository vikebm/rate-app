## My Personal Microservice Template

This is a simple microservice template that i recently started
to use for my node microservices, for me this is the most
efficient way to build microservices as of now. There's
still a few amends to be done to this template such as scripts
to build docker images and such which i've yet to start using;
in due time i shall add them.

### Dev Dependencies used
- **Babel**: Used to compile the project, for babel plugins i use `@babel/cli`
  `@babel/core` `@babel/node` and `@babel/presets-env`
- **Eslint**: Used to check for mistakes in the source files. I personally use
  prettier to check for rules so i use `eslint-config-prettier` and
  `eslint-pluggin-prettier` to help me with this
- **Jest**: Used for testing purposes
- **Nodemon**: to run the project as dev used usually with `babel-node`
- **Prettier**: as a ruleset for the code
- **Rimraf**: it's just a helper to delete the dist folder when i'm rebuilding
    the project
