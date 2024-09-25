import getConnection from '../../db';

export const getUser = async (req, res) => {
    const db = await getConnection();
    const [data] = await db.query('select * from user');

    return res.status(200).json({
        status: 200,
        message: 'success',
        data,
    });
}

export const getOneUser = async (req, res) => {
    const user_id = req.params.id;
    const db = await getConnection();

    const getOneQuery = 'select * from user where user_id = ?';
    const [[data]] = await db.query(getOneQuery, user_id);

    return res.status(200).json({
        status: 200,
        message: 'success',
        data: data,
    });
}

export const postUser = async (req, res) => {
    const { id, pw, name, phone } = req.body;
    const db = await getConnection();

    const postQuery = 'insert into user(id, pw, name, phone) values(?, ?, ?, ?)';
    const [data] = await db.query(postQuery, [id, pw, name, phone]);

    return res.status(200).json({
        status: 200,
        message: 'success',
        data
    });
}