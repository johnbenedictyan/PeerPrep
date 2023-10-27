import { getMockReq, getMockRes } from "@jest-mock/express";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import { Kafka } from "kafkajs";

import QuestionEventProducer from "../../events/producers/question/producer";
import { QuestionCreateDTO } from "../../interfaces/question/createDTO";
import { Question } from "../../interfaces/question/object";
import { QuestionUpdateDTO } from "../../interfaces/question/updateDTO";
import QuestionParser from "../../parsers/question/question.parser";
import QuestionService from "../../services/question/question.service";
import { StringInterface } from "../../util/stringInterface";
import QuestionController from "./question.controller";
import { FullQuestion } from "../../interfaces/fullQuestion/object";
import { FullQuestionUpdateDTO } from "../../interfaces/fullQuestion/updateDTO";
import { FullQuestionCreateDTO } from "../../interfaces/fullQuestion/createDTO";
import stringify from "../../util/stringfy";

jest.mock("kafkajs");
jest.mock("@prisma/client");
jest.mock("../../events/producers/question/producer");
jest.mock("../../parsers/question/question.parser");
jest.mock("../../services/question/question.service");

const MockQuestionService = jest.mocked(QuestionService);
const MockPrisma = jest.mocked(PrismaClient);
const MockKafka = jest.mocked(Kafka);
const MockQuestionEventProducer = jest.mocked(QuestionEventProducer);
const MockQuestionParser = jest.mocked(QuestionParser);

const MockKafkaInstance = new MockKafka({
  brokers: ["localhost:9092"],
  clientId: "question-service",
});
const MockQuestionEventProducerInstance = new MockQuestionEventProducer(
  MockKafkaInstance.producer(),
);
const MockQuestionParserInstance = new MockQuestionParser();
const MockPrismaInstance = new MockPrisma();
const MockQuestionServiceInstance = new MockQuestionService(MockPrismaInstance);



describe("Test question request controller", () => {
  beforeEach(() => {
    MockQuestionService.mockClear();
    MockQuestionEventProducer.mockClear();
  });

  test("Health Check should be 200", () => {
    const { res } = getMockRes({ locals: {} });
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    controller.healthCheck(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "OK" });
  });

  const createInputAllFields: FullQuestionCreateDTO = {
    title: "Question 1",
    content: "This is the question content",
    difficulty: "easy",
    examples: ["1,2,3 = 6"],
    constraints: ["No constraints"],
    authorId: "abc",
    runnerCodes: [{
        language: "java",
        code: 'hello world'
    }],
    initialCodes: [{
        language: "python",
        code: "print('Hello Word')"
    }]
};

const createExpectedQuestion: FullQuestion = {
    ...createInputAllFields,
    id: 1,
    createdAt: new Date(),
    updatedAt:  new Date(),
    initialCodes: [{
        language: 'java',
        code: 'hello world',
        questionId: 1
    }],
    runnerCodes: [{
        language: 'java',
        code: 'hello world',
        questionId: 1
    }]
};

const updateInputAllFields: FullQuestionUpdateDTO = {
    title: "Question 2",
    content: "This is the question content edited",
    difficulty: "medium",
    examples: ["1,2,3 = 7"],
    constraints: ["Some constraints"],
    runnerCodes: [{
        language: "python",
        code: 'console.log(hello world)'
    }],
    initialCodes: [{
        language: "python",
        code: "def foo():"
    }]
};

const updateExpectedQuestion: FullQuestion = {
    ...updateInputAllFields,
    authorId: createInputAllFields.authorId,
    id: 1,
    createdAt: new Date(),
    updatedAt:  new Date(),
    runnerCodes: updateInputAllFields.runnerCodes.map(x => ({...x,questionId: 1})),
    initialCodes: updateInputAllFields.initialCodes.map(x => ({...x,questionId: 1})),

};

  // Create
  test("Controller-Service: Create Question, Valid Input To Service -> Return Object", async () => {
    const serviceCreateMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "create",
    );

    const eventProducerMethod = jest.spyOn(
      MockQuestionEventProducerInstance,
      "create",
    );

    serviceCreateMethod.mockResolvedValue(createExpectedQuestion);

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.create(req, res);

    expect(serviceCreateMethod).toBeCalled();
    expect(eventProducerMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(createExpectedQuestion);
  });

  test("Controller-Service: Create Question, Invalid Input To Service -> Return Error", async () => {
    const serviceCreateMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "create",
    );

    serviceCreateMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    await controller.create(req, res);

    expect(serviceCreateMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  test("Controller-Parser: Create Question, All Fields -> Test Pass Information to Parser", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({
      body: createInputAllFields,
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseCreateInput",
    );

    await controller.create(req, res);

    expect(parserParseMethod).toBeCalledWith(createInputAllFields);
  });

  test("Controller-Parser: Create Question, Invalid Input To Parser -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseCreateInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });

  // Find By Id
  test("Controller-Service: Find Question By Id, Valid Input To Service -> Return Object", async () => {
    const testId: string = "1";

    const serviceFindByIdMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findById",
    );

    serviceFindByIdMethod.mockResolvedValue(createExpectedQuestion);

    const { res } = getMockRes({});
    const req = getMockReq({
      params: {
        id: testId,
      },
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findById(req, res);

    expect(serviceFindByIdMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(createExpectedQuestion);
  });

  test("Controller-Service: Find Question By Id, Invalid Input To Service -> Return Error", async () => {
    const serviceFindByIdMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findById",
    );

    serviceFindByIdMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findById(req, res);

    expect(serviceFindByIdMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  test("Controller-Parser: Find Question By Id, All Fields -> Test Pass Information to Parser", async () => {
    const testId: string = "1";
    const { res } = getMockRes({});
    const req = getMockReq({
      params: {
        id: testId,
      },
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    await controller.findById(req, res);

    expect(parserParseMethod).toBeCalledWith(testId);
  });

  test("Controller-Parser: Find Question By Id, Invalid Input To Parser -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });

  // Find One
  test("Controller-Service: Find One Question, Valid Input To Service -> Return Object", async () => {
    const input: StringInterface<FullQuestion> = stringify(updateExpectedQuestion);

    const serviceFindOneMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findOne",
    );

    serviceFindOneMethod.mockResolvedValue(createExpectedQuestion);

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindOneInput",
    );

    parserParseMethod.mockImplementation(() => createExpectedQuestion);

    const { res } = getMockRes({});
    const req = getMockReq({
      body: input,
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findOne(req, res);

    expect(serviceFindOneMethod).toBeCalledWith(createExpectedQuestion);
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(createExpectedQuestion);
  });

  test("Controller-Service: Find One Question, Invalid Input To Service -> Return Error", async () => {
    const serviceFindOneMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findOne",
    );

    serviceFindOneMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findOne(req, res);

    expect(serviceFindOneMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  test("Controller-Parser: Find One Question, Invalid Input To Parser -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindOneInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.findOne(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });

  // Find All
  test("Controller-Service: Find All Question, Valid Input To Service -> Return Object", async () => {
    const expectedQuestions = [createExpectedQuestion, updateExpectedQuestion];

    const serviceFindAllMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findAll",
    );

    serviceFindAllMethod.mockResolvedValue(expectedQuestions);

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findAll(req, res);

    expect(serviceFindAllMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(expectedQuestions);
  });

  test("Controller-Service: Find All Question, Invalid Input To Service -> Return Error", async () => {
    const serviceFindAllMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "findAll",
    );

    serviceFindAllMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.findAll(req, res);

    expect(serviceFindAllMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  // Update
  test("Controller-Service: Update Question, Valid Input To Service -> Return Object", async () => {
    const testId: number = 1;

    const serviceUpdateMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "update",
    );

    serviceUpdateMethod.mockResolvedValue(updateExpectedQuestion);

    const eventProducerMethod = jest.spyOn(
      MockQuestionEventProducerInstance,
      "update",
    );

    const parserParseFindByIdInputMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    const parserParseUpdateInputMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseUpdateInput",
    );

    parserParseFindByIdInputMethod.mockImplementation(() => testId);
    parserParseUpdateInputMethod.mockImplementation(() => updateInputAllFields);

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.update(req, res);

    expect(serviceUpdateMethod).toBeCalledWith(testId, updateInputAllFields);
    expect(eventProducerMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(updateExpectedQuestion);
  });

  test("Controller-Service: Update Question, Invalid Input To Service -> Return Error", async () => {
    const serviceUpdateMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "update",
    );

    serviceUpdateMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.update(req, res);

    expect(serviceUpdateMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  test("Controller-Parser: Update Question, All Fields -> Test Pass Information to Parsers", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({
      body: updateInputAllFields,
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseUpdateInput",
    );

    await controller.update(req, res);

    expect(parserParseMethod).toBeCalledWith(updateInputAllFields);
  });

  test("Controller-Parser: Update Question, Parser Find By Input Error -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });

  test("Controller-Parser: Update Question, Parser Update Input Error -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseUpdateInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });

  // Delete
  test("Controller-Service: Delete Question, Valid Input To Service -> Return Object", async () => {
    const testId: string = "1";

    const serviceDeleteMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "delete",
    );

    serviceDeleteMethod.mockResolvedValue(createExpectedQuestion);

    const eventProducerMethod = jest.spyOn(
      MockQuestionEventProducerInstance,
      "delete",
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    parserParseMethod.mockImplementation(() => parseInt(testId));

    const { res } = getMockRes({});
    const req = getMockReq({
      params: {
        id: testId,
      },
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );
    await controller.delete(req, res);

    expect(serviceDeleteMethod).toBeCalledWith(parseInt(testId));
    expect(eventProducerMethod).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(createExpectedQuestion);
  });

  test("Controller-Service: Delete Question, Invalid Input To Service -> Return Error", async () => {
    const serviceDeleteMethod = jest.spyOn(
      MockQuestionServiceInstance,
      "delete",
    );

    serviceDeleteMethod.mockImplementation(() => {
      throw new Error("Service Error");
    });

    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    await controller.delete(req, res);

    expect(serviceDeleteMethod).toThrowError();
    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Service Error",
      success: false,
    });
  });

  test("Controller-Parser: Delete Question, All Fields -> Test Pass Information to Parser", async () => {
    const testId: string = "1";
    const { res } = getMockRes({});
    const req = getMockReq({
      params: {
        id: testId,
      },
    });

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    await controller.delete(req, res);

    expect(parserParseMethod).toBeCalledWith(testId);
  });

  test("Controller-Parser: Delete Question, Invalid Input To Parser -> Return Error", async () => {
    const { res } = getMockRes({});
    const req = getMockReq({});

    const controller = new QuestionController(
      MockQuestionServiceInstance,
      MockQuestionParserInstance,
      MockQuestionEventProducerInstance,
    );

    const parserParseMethod = jest.spyOn(
      MockQuestionParserInstance,
      "parseFindByIdInput",
    );

    parserParseMethod.mockImplementation(() => {
      throw new Error("Parser Error");
    });

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Parser Error",
      success: false,
    });
  });
});
