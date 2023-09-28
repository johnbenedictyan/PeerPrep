interface ICodeResultProps {
  result: string;
}

const CodeResult: React.FC<ICodeResultProps> = ({ result }) => (
  <div className="h-80 border rounded-lg shadow p-5">
    <h1 className="font-bold">Code Result</h1>
    <p>{result}</p>
  </div>
);

export default CodeResult;
