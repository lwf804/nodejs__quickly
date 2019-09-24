import ejsEngine from 'ejs-locals';

export default () => {
  return {
    engineName: 'ejs',
    engine: ejsEngine,
  };
};
