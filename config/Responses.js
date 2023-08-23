import { Player } from "../src/app/Entities/Player"

class Success {
    constructor(status = 200, message) {
        this.status = status
        this.message = message
    }

    /**
     * 
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static message(message = 'Success') {
        return new Success(this.status, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static created(message = 'Created') {
        return new Success(201, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static accepted(message = 'Accepted') {
        return new Success(202, message)
    }

    /**
     * 
     * @param {any} message
     * @param {Player} player
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static winner(player, message = "Winner") {
        return new Success(206, { message, player })
    }

    /**
     * 
     * @param {Player[]} playersTieList
     * @returns {Success}
     * @memberof Success
     * @static
     */
    static tie(playersTieList) {
        return new Success(208, { message: "Tie", playersTieList })
    }
}

class Error {
    constructor(status = 500, message) {
        this.status = status
        this.message = message
    }

    /**
     * 
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static message(message = 'Error') {
        return new Error(this.status, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     * @example
     */
    static badRequest(message = 'Bad Request') {
        return new Error(400, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static unauthorized(message = 'Unauthorized') {
        return new Error(401, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static forbidden(message = 'Forbidden') {
        return new Error(403, message)
    }

    /**
     * 
     * @param {any} message
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static notFound(message = 'Not Found') {
        return new Error(404, message)
    }

    /**
     * 
     * @param {any} message - All players was killer
     * @returns {Error}
     * @memberof Error
     * @static
     */
    static allKillers(message = 'All players was killer') {
        return new Error(418, message)
    }
}

const SuccessType = Success
const ErrorType = Error

export { Success, Error, SuccessType, ErrorType }