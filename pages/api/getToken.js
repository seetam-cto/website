import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
let accessToken;

const sendToken = async (req, res) => {
    const token = await getToken({req, secret})
    accessToken = token.accessToken;
    res.status(200).json(accessToken)
}

export default sendToken