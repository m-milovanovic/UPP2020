const getOptions = (resourceKey: string): any[] => {
  switch (true) {
    case resourceKey === 'genres':
      return ['SciFi', 'Economics', 'History'];
    case resourceKey.includes('parsearray'):
      return JSON.parse(resourceKey.split('-', 2)[1]);
    default:
      return [];
  }
};

const EnumService = { getOptions };

export default EnumService;
