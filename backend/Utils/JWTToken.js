const sendToken = (user,authority, statusCode, res) => {
    const token = user.getJWTToken();

    const option = {
        expire:new Date(
            Date.now + process.env.COOKIE_EXPIRE * 24  * 60 * 60 * 1000
        ),
        httpOnly:true,
    };

    res.status(statusCode).cookie('token',token,option).json({
        success:true,
        user,
        authority,
        token,
    });
}

export default sendToken;