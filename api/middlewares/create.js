const { createUserAndTeam, 
    createSchema, createComplainndEmpAddress, 
    createEmpStatusAndEmpMartia,createInternalNotiAndFeedback } = require('../../DAL/createTables')

const {AppError} = require('../../utils/ErrorHandler')

module.exports.createSchema = async (req, res, next) => {
    try {
        const created = await createSchema(req.tenantId);

        if(created){
           throw new AppError("You already have organization created with this account",401)
        }
        next();
    } catch (err) {
        next(err)
    }
}

module.exports.createUsandTeam = async (req, res, next) => {
    try {
        await createUserAndTeam();
        next();
    } catch (err) {
        next(err)
    }
}

module.exports.createComplandTeam = async (req, res, next) => {
    try {
        await createComplainndEmpAddress();
        next()
    } catch (err) {
        next(err)
    }
}

module.exports.createEmpStatandUpdate = async (req, res, next) => {
    try {
        await createEmpStatusAndEmpMartia();
        next();
    } catch (err) {
        next(err)
    }
}

module.exports.createInterandFeed = async (req, res, next) => {
    try {
        await createInternalNotiAndFeedback();
        next()
    } catch (err) {
        next(err)
    }
}