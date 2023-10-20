import { describe, expect } from "vitest";
import { Success, Error, isObject, mappedActions } from "../../src/Core/utils.js";

describe("Test utils", () => {
    describe('Success test', () => {
        expect(Success).toBeInstanceOf(Function);
        expect(Success()).toEqual({ status: 200, message: undefined });
        expect(Success.message()).toEqual({ status: 200, message: "Success" });
        expect(Success.created()).toEqual({ status: 201, message: "Created" });
        expect(Success.accepted()).toEqual({ status: 202, message: "Accepted" });
    });

    describe('Error test', () => {
        expect(Error).toBeInstanceOf(Function);
        expect(Error()).toEqual({ status: 500, message: undefined });
        expect(Error.message()).toEqual({ status: 500, message: "Error" });
        expect(Error.badRequest()).toEqual({ status: 400, message: "Bad Request" });
        expect(Error.unauthorized()).toEqual({ status: 401, message: "Unauthorized" });
        expect(Error.forbidden()).toEqual({ status: 403, message: "Forbidden" });
        expect(Error.notFound()).toEqual({ status: 404, message: "Not Found" });
    });

    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);

    expect(Object(mappedActions).entries()).toBeInstanceOf(Function);
});