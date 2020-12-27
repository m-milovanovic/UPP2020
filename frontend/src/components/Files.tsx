interface FilesProps {
  files: File[];
}

interface File {
  name: string;
  id: string;
}

const Files: React.FC<FilesProps> = ({ files }) => {
  return (
    <div>
      <h4>View Files: </h4>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a
              href={`${process.env.REACT_APP_API_URL}/files/download/${file.id}`}
              target='_blank'
              rel='norefferer'>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;
