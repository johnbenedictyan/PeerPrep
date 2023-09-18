import { getMockReq, getMockRes } from '@jest-mock/express';
import { afterEach, describe, expect, jest, test } from '@jest/globals';

import MatchingServiceMock from '../services/matching.service.mock';
import MatchingController from './matching.controller';

describe("Test matching controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Health Check should be 200", () => {
    const { res } = getMockRes({
      locals: {},
    });
    const req = getMockReq({});

    const ctrl = new MatchingController(new MatchingServiceMock());
    ctrl.healthCheck(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.stringMatching("OK"));
  });
});
