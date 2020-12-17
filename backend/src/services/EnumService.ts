const getOptions = (resourceKey: string): any[] => {
  switch (resourceKey) {
    case 'genres':
      return ['SciFi', 'Economics', 'History'];
    default:
      return [];
  }
};

const EnumService = { getOptions };

export default EnumService;
