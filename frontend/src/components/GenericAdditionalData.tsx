import Files from './Files';

interface GenericAdditionalDataProps {
  additionalData: any;
}

const GenericAdditionalData: React.FC<GenericAdditionalDataProps> = ({ additionalData }) => {
  return <div>{additionalData.type === 'review' && <Files files={additionalData.data} />}</div>;
};

export default GenericAdditionalData;
