import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface TestCaseProps {
  isLoading: boolean;
  testCasePassed: boolean;
  testCaseNumber: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
}
function TestCase({
  isLoading,
  testCasePassed,
  testCaseNumber,
  input,
  expectedOutput,
  actualOutput,
}: TestCaseProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-500 w-72 min-h-48">
      {isLoading ? (
        <div className="flex flex-col h-full">
          <p className="text-sm font-medium text-gray-900">{`Test Case #${testCaseNumber}`}</p>
          <div className="flex flex-col justify-center h-full">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400">
                &nbsp;
              </div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400">
                &nbsp;
              </div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {testCasePassed ? (
                <CheckCircleIcon className="h-10 w-100 rounded-full text-green-500" />
              ) : (
                <XCircleIcon className="h-10 w-100 rounded-full text-red-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{`Test Case #${testCaseNumber}`}</p>
              {testCasePassed ? (
                <p className="truncate text-sm text-green-500">Passed</p>
              ) : (
                <p className="truncate text-sm text-red-500">Failed</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex my-2">
              <div className="flex flex-1">
                <h1 className="text-sm text-gray-500">Input</h1>
              </div>
              <div className="flex flex-1 justify-center">
                <h1 className="text-sm text-gray-500">{input}</h1>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex flex-1">
                <h1 className="text-sm text-gray-500">Expected Output</h1>
              </div>
              <div className="flex flex-1 justify-center">
                <h1 className="text-sm text-gray-500">{expectedOutput}</h1>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex flex-1">
                <h1 className="text-sm text-gray-500">Actual Output</h1>
              </div>
              <div className="flex flex-1 justify-center">
                <h1 className="text-sm text-gray-500">{actualOutput}</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TestCase;
