module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',  // Transform JavaScript and JSX files with babel-jest
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
  };
  