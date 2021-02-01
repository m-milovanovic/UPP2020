import Files from './Files';

interface GenericAdditionalDataProps {
  additionalData: any;
}

const GenericAdditionalData: React.FC<GenericAdditionalDataProps> = ({ additionalData }) => {
  return <div>{additionalData.type === 'files' && <Files files={additionalData.data} />}</div>;
};

export default GenericAdditionalData;
