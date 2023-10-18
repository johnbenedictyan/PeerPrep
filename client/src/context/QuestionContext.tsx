import { langs } from "@uiw/codemirror-extensions-langs";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import QuestionController from "../controllers/question/question.controller";
import { FullQuestion } from "../interfaces/questionService/fullQuestion/object";

export type codingLanguage = keyof typeof langs;

const defaultQuestion: FullQuestion = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  content: `
          <p>
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
          You can return the answer in any order.
          </p>
        `,
  examples: [
    `<p>Input: nums = [2,7,11,15], target = 9</p>
                    <p>Output: [0,1]</p>
                    <p>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]</p>`,
    `<p>Input: nums = [3,2,4], target = 6</p>
                    <p>Output: [1,2]</p>`,
    `<p>Input: nums = [3,3], target = 6</p>
                    <p>Output: [0,1]</p>`,
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "abc123",
  initialCodes: [
    {
      code: `class Solution {
        public int[] twoSum(int[] nums, int target) {
          Map<Integer, Integer> numMap = new HashMap<>();
          int n = nums.length;

          for (int i = 0; i < n; i++) {
              int complement = target - nums[i];
              if (numMap.containsKey(complement)) {
                  return new int[]{numMap.get(complement), i};
              }
              numMap.put(nums[i], i);
          }

          return new int[]{}; // No solution found
        }
    }`,
      language: "java",
      questionId: 1,
    },
  ],
};

const defaultInitialCode = "// Default Code //";
const defaultSelectedLanguage = "java" as codingLanguage;

interface QuestionProviderProps {
  children: ReactNode;
}

interface QuestionContextType {
  question: FullQuestion;
  selectedLanguage: codingLanguage;
  initialCode: string;
  setSelectedLanguage: (selectedLanguage: codingLanguage) => void;
  setQuestionId: (id: number) => void;
}

export const QuestionContext = createContext<QuestionContextType>({
  question: defaultQuestion,
  selectedLanguage: defaultSelectedLanguage,
  initialCode: defaultInitialCode,
  setSelectedLanguage: (selectedLanguage: codingLanguage) => {},
  setQuestionId: (id: number) => {},
});

export function QuestionProvider({ children }: QuestionProviderProps) {
  const [question, setQuestion] = useState<FullQuestion>(defaultQuestion);
  const [selectedLanguage, setSelectedLanguage] = useState<codingLanguage>(
    defaultSelectedLanguage
  );
  const [initialCode, setInitialCode] = useState<string>(defaultInitialCode);
  const [questionId, setQuestionId] = useState<number>();

  const value = useMemo(
    () => ({
      question,
      selectedLanguage,
      initialCode,
      setSelectedLanguage,
      setQuestionId,
    }),
    [
      question,
      selectedLanguage,
      initialCode,
      setSelectedLanguage,
      setQuestionId,
    ],
  );

  const loadQuestionData = useCallback(() => {
    if (!questionId) return;
    const questionController = new QuestionController();
    questionController
      .getQuestion(questionId)
      .then((res) => {
        if (res) {
          setQuestion(res.data);
        }
      })
      .catch((err) => {});
  }, [questionId]);

  useEffect(() => {
    loadQuestionData();
  }, [loadQuestionData]);

  const loadInitialCode = useCallback(() => {
    if (!question) return;
    const foundCode = question.initialCodes.find(
      (x) => x.language === selectedLanguage,
    );
    setInitialCode(foundCode ? foundCode.code : defaultInitialCode);
  }, [question, selectedLanguage]);

  useEffect(() => {
    loadInitialCode();
  }, [loadInitialCode]);

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
