import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: "postgres",
        port: 5432,
        dialectOptions: {
            ssl: { rejectUnauthorized: false },
        },
    }
);

const facts = sequelize.define(
    "facts",
    {
        fact_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        fact: Sequelize.STRING,
    },
    {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    }
);

export async function createFact(fact) {
    await sequelize.sync();
    return new Promise(async (resolve, reject) => {
        try {
            const response = await facts.create({
                fact: JSON.stringify(fact),
            });
            console.log(response);
            resolve(response);
        } catch (err) {
            console.log(`[createFact] Error: ${err}`);
            reject(err);
        }
    });
}

export async function getAllFacts() {
    await sequelize.sync();
    return new Promise(async (resolve, reject) => {
        try {
            const response = await facts.findAll({
                attributes: ["fact"],
            });
            console.log(response);
            resolve(response);
        } catch (err) {
            console.log(`[getAllFacts] Error: ${err}`);
            reject(err);
        }
    });
}

export async function updateFactById(id, fact) {
    await sequelize.sync();
    return new Promise(async (resolve, reject) => {
        try {
            const response = await facts.update(
                { fact },
                {
                    where: {
                        fact_id: id,
                    },
                }
            );
            console.log(response);
            resolve(response);
        } catch (err) {
            console.log(`[updateFactById] Error: ${err}`);
            reject(err);
        }
    });
}
export async function deleteFactById(id) {
    await sequelize.sync();
    return new Promise(async (resolve, reject) => {
        try {
            const response = await facts.destroy({
                where: {
                    fact_id: id,
                },
            });
            console.log(response);
            resolve(response);
        } catch (err) {
            console.log(`[deleteFactById] Error: ${err}`);
            reject(err);
        }
    });
}
