import { useContext, useState } from "react";

import { QuestionContext } from "../context/QuestionContext";
import { FullTestCase } from "../interfaces/questionService/questionTestCase/object";
import TestCase from "./TestCase";
import Judge0Controller from "../controllers/judge0/judge0.controller";

function CodeResult() {
  const { question, selectedLanguage } = useContext(QuestionContext);
  const [fullTestCases, setFullTestCases] = useState<FullTestCase[]>(
    question.testCases.map((x) => ({
      ...x,
      executed: false,
      passed: false,
      actualOutput: "",
    })),
  );

  const handleSubmit = async () => {
    // const judge0Controller = new Judge0Controller();
    // judge0Controller.postBatchSubmission(selectedLanguage, question.testCases)
  };

  return (
    <>
      <div className="flex flex-row-reverse mt-5">
        <button
          type="button"
          className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400"
          onClick={handleSubmit}
        >
          Submit Code
        </button>
      </div>
      <div className="mt-5">
        <div className="border rounded-lg shadow p-5">
          <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
            Code Result
          </h1>
          <div className="flex flex-row gap-2">
            {fullTestCases.map((testCase) => (
              <TestCase
                testCasePassed={testCase.passed}
                input={testCase.input}
                expectedOutput={testCase.expectedOutput}
                actualOutput={testCase.actualOutput}
                testCaseNumber={testCase.testCaseNumber}
                isLoading={!testCase.executed}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeResult;
