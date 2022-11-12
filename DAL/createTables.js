const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const {AppError} = require('../utils/ErrorHandler');
const format = require('pg-format');

class Create{
    static async createSchema(tenantId){
        const client = await pool.connect();
        try{
            console.log("one")
            const spquery = format("SELECT status from organization where name = %L", tenantId)
            const searchPath = await pool.query(spquery);
            
            if(searchPath.rows[0].status === "Active"){
                return true;
            }else{
                await client.query(`CREATE SCHEMA ${tenantId};`);

                await client.query(`SET search_path TO ${tenantId}, public;`);
    
                await client.release();
            }

        }catch(err){
            await client.query(`ROLLBACK`);
            await client.release();
            console.log(err)

        }
    }
    static async createUserAndTeam(){
        const client = await pool.connect();
        console.log("two")

       try{
            const createTquery = {
                // give the query a unique name
                name: 'create_team',
                text:  `CREATE TABLE team (id integer NOT NULL,team_name character varying(100) 
                NOT NULL, status character varying(100) NOT NULL,createdat date NOT NULL,PRIMARY KEY(id));`,
            }
            
            const createUserQuery = {
                // give the query a unique name
                name: 'create_users',
                text: `CREATE TABLE users ( id integer NOT NULL, firstname character varying(100) NOT NULL,lastname character varying(100) NOT NULL,
                    email character varying(100) NOT NULL,phone_number integer NOT NULL,gender character(8) NOT NULL,birthdate date NOT NULL,
                    img text NOT NULL, role character varying(100) NOT NULL, teamid integer NOT NULL, password text NOT NULL,
                    passwordchangedat timestamp with time zone NOT NULL,createdat timestamp with time zone NOT NULL,PRIMARY KEY(id),  
                    CONSTRAINT team_id FOREIGN KEY(teamid) REFERENCES team(id)  
                );`,
            }

            await client.query(createTquery);

            await client.query(createUserQuery);

            await client.release();
        }catch(err){
            await client.query(`ROLLBACK`);
            await client.release();
            console.log(err)

        }
    }

    static async createComplainndEmpAddress(){

        const client = await pool.connect();
        console.log("three")

        try{
            const createCompainQuery = {
                // give the query a unique name
                name: 'create_complain',
                text: `CREATE TABLE complain ( cid integer NOT NULL, comper integer NOT NULL, complainedon integer REFERENCES users(id) ,
                    content text NOT NULL,createdat timestamp with time zone NOT NULL, PRIMARY KEY(cid),
                    CONSTRAINT compl FOREIGN KEY(comper) REFERENCES users(id)  
                );`,
            }

            const createEmpAddressQuery = {
                // give the query a unique name
                name: 'create_user_address',
                text: `CREATE TABLE user_address ( id integer NOT NULL, empid integer NOT NULL, country character varying NOT NULL,
                    city character varying NOT NULL, subcity character varying NOT NULL, wereda integer NOT NULL, housenumber integer NOT NULL,
                    createdat timestamp with time zone NOT NULL, PRIMARY KEY(id)  
                );`,
            }

            await client.query(createCompainQuery);

            await client.query(createEmpAddressQuery);

            await client.release();
        }catch(err){
            await client.query(`ROLLBACK`);
            await client.release();
            console.log(err)

        }
    }
   
    static async createEmpStatusAndEmpMartia(){

        const client = await pool.connect();
        console.log("four")

        try{
            const createEmpMartialQuery = {
                // give the query a unique name
                name: 'create_user_marital_status',
                text: `CREATE TABLE user_marital_status (id integer NOT NULL, status character varying(100) NOT NULL,
                    numberofchildren integer NOT NULL,createdat timestamp with time zone NOT NULL,PRIMARY KEY(id)
                );`,
            }
            
            const createEmpStatuslQuery = {
                // give the query a unique name
                name: 'create_user_status',
                text: `CREATE TABLE user_status (id integer NOT NULL, userid integer NOT NULL, yearlyrest integer DEFAULT 0 NOT NULL,
                    probation boolean NOT NULL, numberofprobation integer DEFAULT 0 NOT NULL,status character varying(100) NOT NULL,
                    createdat timestamp with time zone NOT NULL,PRIMARY KEY(id), CONSTRAINT emplo_id  
                    FOREIGN KEY(userid) REFERENCES users(id)
                );`,
            }

            await client.query(createEmpMartialQuery);

            await client.query(createEmpStatuslQuery);

            await client.release();
        }catch(err){
            await client.query(`ROLLBACK`);
            await client.release();
            console.log(err)

        }
    }
    
    static async createInternalNotiAndFeedback(){

        const client = await pool.connect();
        console.log("five")

        try{
            const createFeedbackQuery = {
                // give the query a unique name
                name: 'create_feedback',
                text: `CREATE TABLE feedback ( id integer NOT NULL, userid integer NOT NULL,title character varying(100) NOT NULL,
                    content text NOT NULL, createdat timestamp with time zone NOT NULL, PRIMARY KEY(id),  
                    CONSTRAINT emplo_id FOREIGN KEY(userid) REFERENCES users(id)
                );`,
            }
            
            const createInternalNotiQuery = {
                // give the query a unique name
                name: 'create_internalnotice',
                text: `CREATE TABLE internalnotice ( id integer NOT NULL, title character varying(100) NOT NULL, content text NOT NULL,
                    postedby character varying(100) NOT NULL, read boolean DEFAULT false NOT NULL, numberofread integer DEFAULT 0 NOT NULL,
                    createdat timestamp with time zone NOT NULL
                );`,
            }

            await client.query(createFeedbackQuery);

            await client.query(createInternalNotiQuery);

            await client.release();
    }catch(err){
        console.log(err)
        await client.query(`ROLLBACK`);
        await client.release();
    }
    }
}


module.exports = Create;